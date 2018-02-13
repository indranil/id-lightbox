var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var bourbon = require('bourbon').includePaths;
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

gulp.task('sass', () =>
	sass('src/id-lightbox.scss', {
      loadPath: [bourbon]
    })
		.on('error', sass.logError)
		.pipe(gulp.dest('dist'))
);

gulp.task('minify-css', ['sass'], () =>
  gulp.src('dist/id-lightbox.css')
    .pipe(cleanCSS())
    .pipe(rename('id-lightbox.min.css'))
    .pipe(gulp.dest('dist'))
);

gulp.task('scripts', () =>
  gulp.src('src/*.js')
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist'))
);

gulp.task('build', ['sass', 'minify-css', 'scripts']);
