var gulp = require('gulp');
var del = require('del');
var run = require('gulp-run');

const paths = {
    src: ['./src/**/*.ts', '!./src/**/*.spec.ts'],
    entry: './src/big-decimal.ts',
    lib: './lib/',
    dist: './dist/'
}

const webpackConfig = require('./webpack.config.js');

gulp.task('clean', function () {
    return del(['./dist/*']);
})

gulp.task('dist', gulp.series('clean', function (done) {

    var cmd = new run.Command('webpack-cli', { usePowerShell: true, silent: true });

    //web non-prod
    process.env.USE_ENV = 'web';
    process.env.NODE_ENV = 'dev';
    cmd.exec();

    //web prod
    process.env.USE_ENV = 'web';
    process.env.NODE_ENV = 'production';
    cmd.exec();

    //node non-prod
    process.env.USE_ENV = 'node';
    process.env.NODE_ENV = 'dev';
    cmd.exec();

    //node prod
    process.env.USE_ENV = 'node';
    process.env.NODE_ENV = 'production';
    cmd.exec();

    gulp.src([`${paths.lib}/big-decimal.d.ts`, `${paths.lib}/roundingModes.d.ts`])
        .pipe(gulp.dest(`${paths.dist}/node`));
    
    done();
}));