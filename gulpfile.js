const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');

gulp.task('build', function () {
    // set up the browserify instance on a task basis
    const b = browserify({
        entries: './lib/index.js',
        debug: true,
        transform: [babelify.configure({
            presets: ['es2015']
        })]
    });

    return b.bundle()
        .pipe(source('wwscore.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

