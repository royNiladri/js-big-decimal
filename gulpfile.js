let gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    karmaServer = require('karma').Server;

gulp.task('bundle', ['test'], () => {
    return gulp.src(['src/*.js', '!src/*spec.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bigDecimal.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('bigDecimal.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('test', (done) => {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
    }, done).start();
});

