var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
const config = require('./config');

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

