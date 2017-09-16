var gulp=require("gulp");
var runSequence = require('run-sequence');
var browser = require("browser-sync").create();
var webpack = require("webpack-stream");
var wpConf = require("./webpack.config");
var plumber = require("gulp-plumber");
gulp.task("browserSync", function() {
  browser.init({
    server:{
      baseDir:"./"
    },
    open:false
  });
});

gulp.task('webpack', function(){
  return gulp.src('js/main.js')
    .pipe(plumber())
    .pipe(webpack(wpConf))
    .pipe(gulp.dest('./'))
    .pipe(browser.stream());
});
gulp.task("watch", function() {
  gulp.watch("dist/**", ["webpack"]);
  gulp.watch("index.html", ["webpack"]);  
});
gulp.task("default", function(cb) {
  return runSequence(
      ['browserSync',"webpack"],
    'watch',
    cb
  );
});





