// core
var fs = require('fs');

// gulp
var gulp = require('gulp');
var gutil = require('gulp-util');

// add-ons
var beautify = require('js-beautify').js_beautify;

// local
var buildconfig = require('./buildconfig.json');
var modules = buildconfig.modules;
var dist = buildconfig.dist;

gulp.task('build', function() {
  var content = '';

  modules.forEach(function(file){
    content = content + fs.readFileSync(file, 'utf8');
  });

  content = content.replace(/\/\*.*\*\/\n/g, '');

  content = beautify(content, { indent_size: 2 });

  fs.writeFile(dist, content, function (err) {
    if (err) throw err;
    gutil.log('Created', gutil.colors.cyan('\'' + dist + '\''));
  });
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['build']);
});

gulp.task('default', ['build']);
