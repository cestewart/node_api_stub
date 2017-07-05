var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('./config');
var gulpMocha = require('gulp-mocha')

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
    console.log('Finished at ' + Date())
})

gulp.task('test', function() {
    gulp.watch('tests/**/*.js', ['run-tests'])
});
