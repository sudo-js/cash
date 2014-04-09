var fs = require('fs'),
  $ = require('sudoclass'),
  jsdom = require('jsdom');

/**
 * Node module that reads the script and css assets from an html file
 */
var Filereader = function(filename, pf) {
  this.construct({
    filename: filename,
    pathfinder: pf,
    script_sources: [],
    scripts_parsed: false
  });
  $.extend(this, $.extensions.observable);
  // set the full path to `html_filename`
  this.set('path_to_file', pf.get('root_path') + '/' + filename);
};

Filereader.prototype = Object.create($.Model.prototype);

Filereader.prototype.concatonateSources = function() {
  var i, curr, combined = '',
    ary = this.get('script_sources'),
    root = this.get('pathfinder').get('root_path') +  '/';

  for(i = 0; i < ary.length; i++) {
    curr = root + ary[i];
    // ensure it exists
    if(fs.existsSync(curr)) {
      combined += fs.readFileSync(curr, 'utf8');
    }
  }
  this.set('concat_source', combined);
};

Filereader.prototype.getAlpha = function() {
  return fs.readFileSync(this.get('pathfinder').get('wrap_path') + '/alpha.txt', 'utf8');
};

Filereader.prototype.getOmega = function() {
  return fs.readFileSync(this.get('pathfinder').get('wrap_path') + '/omega.txt', 'utf8');
};

Filereader.prototype.parseHtmlFile = function() {
  // jsdom returns a window from the parsed file
  jsdom.env(this.get('file_contents'),
    this._parseScriptSources.bind(this));
};
/**
 * The callback supplied to `jsdom.env()`
 * @private
 */
Filereader.prototype._parseScriptSources = function(errors, window) {
  var i, version = window.document.getElementsByTagName('title')[0].textContent, 
    scripts = window.document.getElementsByTagName('script'),
    ary = this.get('script_sources');
  for (i = 0; i < scripts.length; i++) {
    // should be document order
    ary.push(scripts[i].src);
  }
  // done with the window
  window.close();
  // observe this so we know when jsdom is finished
  this.sets({version: version, scripts_parsed: true});
};

Filereader.prototype.readHtmlFile = function() {
  this.set('file_contents', fs.readFileSync(this.get('path_to_file'), 'utf8'));
};

module.exports = Filereader;
