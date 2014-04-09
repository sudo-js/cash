var fs = require('fs'), 
  Filereader = require('../filereader.js'),
  Pathfinder = require('../pathfinder.js'),
  vows = require('vows'),
  assert = require('assert'),
  path = require('path'),
  FR = new Filereader('sudo.html',
    new Pathfinder());

vows.describe('The Filereader Class').addBatch({
  'Has the following functionality': {
    topic: FR,
    'sets the passed in filename': function(fr) {
      assert.equal(fr.get('filename'), 'sudo.html');
    },
    'finds the passed in filename': function(fr) {
      assert.isTrue(path.existsSync(fr.get('path_to_file')));
    },
    'reads the file in as a string': function(fr) {
      fr.readHtmlFile();
      assert.isString(fr.get('file_contents'));
    },
    'parses the string, and gets the src attributes of all scripts': function(fr) {
      fr.parseHtmlFile();
      //assert.isTrue(fr.get('script_sources').length > 0);
    },
    'concatonates all the sources into a single string': function(fr) {
      //fr.concatonateSources();
      //assert.isTrue(fr.get('concat_source').length > 0);
    }
  }
}).export(module);
