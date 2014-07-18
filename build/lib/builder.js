var $ = require('sudoclass'),
  Filereader = require('./filereader.js'),
  Filewriter = require('./filewriter.js');

/**
 * The loop in which we do stuff...
 */
var Builder = function(filename, pf) {
  this.construct({
    filename: filename,
    pathfinder: pf
  });
};

Builder.prototype = Object.create($.Model.prototype);

Builder.prototype.build = function() {
  var buildPath = this.get('filename');
  if(!/\.html$/.test(buildPath)) buildPath += '.html';
  // the reader
  this.FR = new Filereader(buildPath,
    this.get('pathfinder'));
  // set the callback for parseHtmlFile
  this.FR.observe(this.readerScriptsParsed.bind(this));
  this.printline("Reading HTML file: " + this.get('filename'));
  this.FR.readHtmlFile();
  console.log(" - parsing file content, collecting script sources");
  this.FR.parseHtmlFile();
};

// the reader has finished parsing the script links
Builder.prototype.readerScriptsParsed = function(change) {
  if(change.name === 'scripts_parsed' && change.object[change.name]) {
    var version = 'cash.version = "' + change.object.version + '";\n';
    console.log(" - concatonating all scripts to a single `String`");
    this.FR.concatonateSources();
    // the writer
    var FW = new Filewriter(this.get('filename'),
      this.get('pathfinder'));
    this.printline("Writing `debug version` of file: " + FW.get('filename'));
    // include the version number in the string data
    FW.writeDebug(this.FR.getAlpha(), this.FR.get('concat_source') + version,
      this.FR.getOmega());

    console.log(' - stripping JSHint globals');
    FW.stripGlobals();
    console.log(" - debug file written");
  }
};

Builder.prototype.printline = function(line) {
  console.log(line);
  console.log('=========================');
};

module.exports = Builder;
