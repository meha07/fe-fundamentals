
$(function () {
	'use strict';

  const getJSONData = function () {
    $.getJSON('https://raw.githubusercontent.com/meha07/fe-fundamentals/master/data.json',function(data){
      $.each(data,function(i,emp){
        $('#tab' + (i+1)).html(emp.title);
        $('#tab' + (i+1) +'-tab .ootb-tabcordion--entry-content').html(emp.content);
        $('#tab' + (i+1) +'-tab').attr("data-title", emp.title);
      });
    })
    .done(function() { console.log("second success"); })
    .fail(function() { console.log("Something Went wrong"); })
    .always(function() { console.log("complete"); });
  }
  getJSONData();
     
  const keyboardSupport = function(container, hasTabs) {
    const tablist = container.querySelectorAll('[role="tablist"]')[0];
    let tabs;
    let panels;

    const generateArrays = function() {
      panels = container.querySelectorAll('[role="tabpanel"]');
      tabs = container.querySelectorAll('[role="tab"]');
    };
    
    generateArrays();

    const triggerTabClick = function(e) {
      const clickedId = e.target.getAttribute('id');
      if(clickedId) {
        const clickedTab = container.querySelector('[aria-controls="' + clickedId + '"]');
        clickedTab.click();
        document.getElementById(clickedId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    };
    
    const accordionClickEventListener = function(event) {
      //triggerTabClick(event);
    };
    
    // When a tab is clicked, activateTab is fired to activate it
    const clickEventListener = function(event) {
       const tab = event.target;
    };

    const addListeners = function(index) {
      const target = hasTabs ? tabs[index] : panels[index];
      tabs[index].addEventListener('click', clickEventListener);
      if(target) {
         if(!hasTabs) {
          target.addEventListener('click', accordionClickEventListener);
        }
        // Build an array with all tabs (<button>s) in it
        target.index = index;
      }    
    };

    // Bind listeners
    for (let i = 0; i < tabs.length; ++i) {
      addListeners(i);
    }
   
    // Accordion mode
    if(!hasTabs) {
      for (const panel of panels) {
        panel.onclick = function(e) {
          triggerTabClick(e);
        };
      }
    }
  };
  
	const toggleClass = function (otherElems, thisELem, className = 'is-active') {
    if (thisELem.classList.contains(className) && !$(tabContainers).hasClass('has-tabs')) {
      thisELem.classList.remove(className);
    } else {
      for (const otherElem of otherElems) {
        otherElem.classList.remove(className);
      }
      thisELem.classList.add(className);
    }
	};
  
	const toggleTabs = function (tabContainer) {
		const tabs = tabContainer.querySelectorAll('.ootb-tabcordion--tabs .tab');
		const items = tabContainer.querySelectorAll('.ootb-tabcordion--entry');
		for (const tab of tabs) {
      tab.onclick = function() {
        const target = tab.getAttribute('aria-controls');
        const content = document.getElementById(target);
        toggleClass(tabs, tab);
        toggleClass(items, content);
      };
		}
	};
  
  const hasTabs = function(container) {
    return container.classList.contains('has-tabs');
  };
  
	const modeSwitcher = function (tabContainer, containerWidth) {
		const tabs = tabContainer.querySelectorAll('.tab');
    const container = tabs[0].closest('.ootb-tabcordion');
		let totalW = 0;
		for (const tab of tabs) {
			totalW += tab.offsetWidth;
		}
		if (totalW >= containerWidth) {
			container.classList.remove('has-tabs');
		} else {
			container.classList.add('has-tabs');
		}
    keyboardSupport(tabContainer, hasTabs(container));
	};
	
	const resizeObserver = new ResizeObserver(entries => {
		for (let entry of entries) {
			modeSwitcher(entry.target, entry.contentRect.width);
		}
	});

	const tabContainers = document.querySelectorAll('.ootb-tabcordion');
	for (const tabContainer of tabContainers) {
		const tabList = tabContainer.querySelector('.ootb-tabcordion--tabs');
		resizeObserver.observe(tabList);
		toggleTabs(tabContainer);
    keyboardSupport(tabContainer, hasTabs(tabContainer));
	}
});