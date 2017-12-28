const gulp = require('gulp');
const rename = require('gulp-rename');
const stylus = require('gulp-stylus');
const clean = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const mmq = require('gulp-merge-media-queries');

gulp.task('default', () => {
	gulp.watch('stylesheets/**/*', ['style'])
});

gulp.task('style', () => {
	return gulp.src('stylesheets/index.styl')
	.pipe(sourcemaps.init())
		.pipe(stylus({compress: true, 'include css': true}))
		.pipe(mmq())
		.pipe(clean())
		.pipe(rename('bundle.min.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('public/build'))
});