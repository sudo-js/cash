var fs = require('fs'),
  path = require('path'),
  $ = require('sudoclass');

/**
 * @param {string} filename
 * @param {object} pf A Pathfinder instance
 * @constructor
 */
var Filewriter = function(filename, pf) {
  this.construct({
    pathfinder: pf
  });
  this.extToJs(filename);
};

Filewriter.prototype = Object.create($.Model.prototype);

/**
 * we are scraping from an `html` file remove the ext and
 * replace it with the proper `js`
 */
Filewriter.prototype.extToJs = function(filename) {
  var bse = path.basename(filename, '.html');
  this.set('filename', bse + '.js');
};

Filewriter.prototype.stripGlobals = function() {
  var full = this.debug + '/' + this.get('filename');
  fs.readFileSync(this.tmp).toString().split('\n').forEach(function (line) { 
    if(!(/\/*global/.test(line))) {
      fs.appendFileSync(full, line.toString() + "\n");
    }
  });
};

Filewriter.prototype.writeDebug = function(alpha, data, omega) {
  var content = alpha + data + omega, stat;
  this.debug = this.get('pathfinder').get('debug_path');
  stat = fs.statSync(this.debug);
  this.tmp = this.debug + '/tmp.txt';
    
  // make sure its a directory
  if(stat.isDirectory()) {
    fs.writeFileSync(this.tmp, content, 'utf8');
  }
};

module.exports = Filewriter;
