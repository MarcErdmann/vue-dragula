var gulp = require('gulp');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('es6', function () {
    return gulp.src('*.es6.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename(function (obj) {
            obj.basename = obj.basename.split('.')[0] + '.min';
        }))
        .pipe(gulp.dest('./'));
});