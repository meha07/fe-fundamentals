'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));;
var concat = require('gulp-concat');
sass.compiler = require('node-sass');


gulp.task('sass', async function () {
   
   return gulp.src('./src/assets/sass/**/*.scss')
   .pipe(concat('custom.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./src/assets/dist/'));
});

