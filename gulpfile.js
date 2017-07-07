var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('./config');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: config.server.port
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
       console.log('Restarting');
    });
});

gulp.task('run-tests', function(){
    gulp.src('tests/**/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'dot'}))
})

gulp.task('test', ['run-tests'], function() {
    gulp.watch('./tests/**/*.js', ['run-tests'])
});

gulp.task('run-integration-tests', function(){
    gulp.src('integrationTests/**/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'dot'}))
})

gulp.task('integration-test', ['run-integration-tests'], function() {
    gulp.watch('integrationTests/**/*.js', ['run-integration-tests'])
});
