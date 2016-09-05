var node;
var gulp = require('gulp');
var webpack = require('webpack-stream');
var spawn = require('child_process').spawn;

gulp.task('default', ['webpack', 'node', 'node-watch']);

gulp.task('webpack', function () {
    return gulp.src('./src/client/index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .on('error', function (error) {
            this.emit('end');
        })
        .pipe(gulp.dest('./bin/'));
});

gulp.task('node', function () {
    if (node) {
        node.kill();
    }
    node = spawn("node", ["app.js"], { stdio: "inherit" });
    node.on("close", function (code) {
        if (code === 8) {
            gulp.log("Error detected, waiting for changes...");
        }
    });
});

gulp.task('node-watch', function () {
    gulp.watch(
        [
            "./app.js",
            "./src/server/**/*.js",
            "./src/*.js"
        ],
        [
            "node"
        ]
    );
});

process.on("exit", function () {
    if (node) {
        node.kill();
    }
});