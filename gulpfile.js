var gulp = require('gulp');
var sassdoc = require('sassdoc');

gulp.task('docs', function () {
	return gulp.src('dist/sass/**/*.sass')
		.pipe(sassdoc({
			dest: 'docs/'
		}));
});
