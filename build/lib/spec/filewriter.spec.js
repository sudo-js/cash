var Filereader = require('../filereader.js'),
  Filewriter = require('../filewriter.js'),
  Pathfinder = require('../pathfinder.js'),
  vows = require('vows'),
  assert = require('assert'),
  path = require('path'),
  fs = require('fs'),
  PF = new Pathfinder();

vows.describe('The Filewriter Class').addBatch({
  'Has the following functionality': {
    topic: new Filewriter('test', PF),
    'finds the debug folder': function(fw) {
      var stat = fs.statSync(fw.get('pathfinder').get(
        'debug_path'));
      assert.isTrue(stat.isDirectory());
    },
    'writes the debug js file': function(fw) {
      var pth = fw.get('pathfinder').get(
        'debug_path') + '/' + fw.get('filename');
      fw.writeDebug("var foo = {};\nfoo.bar = 'baz';");
      var stat = fs.statSync(pth);
      assert.isTrue(stat.isFile());
    }
  }
}).export(module);
