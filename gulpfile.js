'use strict';

var gulp	= require('gulp');
var sass	= require('gulp-sass');
var concat	= require('gulp-concat');




// Defaults

var defaults = {
	css: {
		source      : 'src/scss',
		destination : 'dist/css',
		extension   : '.scss'
	},
	js: {
		source      : 'src/scripts',
		destination : 'dist/js',
		extension   : '.js'
	}
};



gulp.task('sass', function () {

	gulp.src(defaults.css.source+'/*'+defaults.css.extension)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(defaults.css.destination));
});



gulp.task('watch', function() {

	gulp.watch(defaults.css.source + '/**/*' + defaults.css.extension, ['sass']);
	gulp.watch(defaults.js.source + '/*' + defaults.js.extension, ['concat_js']);

});



gulp.task('concat_js', function() {
	gulp.src([
		defaults.js.source + '/*.js'
		])
		.on('error', console.log)
		.pipe(concat('foot.js'))
		.pipe(gulp.dest(defaults.js.destination));
});



gulp.task('default', ['sass', 'concat_js', 'watch']);


console.log(defaults);

