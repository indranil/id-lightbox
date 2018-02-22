var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var bourbon = require('bourbon').includePaths;
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
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

gulp.task('babel', () =>
  gulp.src('src/id-lightbox.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('minify-js', ['babel'], () =>
	gulp.src('dist/id-lightbox.js')
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(rename('id-lightbox.min.js'))
		.pipe(gulp.dest('dist'))
);

gulp.task('default', ['sass', 'minify-css', 'babel', 'minify-js']);
