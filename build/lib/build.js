/*jsl:declare process*/

var Pathfinder = require('./pathfinder.js'),
  Builder = require('./builder.js'),
  PF = new Pathfinder(),
  i, curr;

// any pages to be scanned (assumed to be in `root`) will
// be at argv[3] or greater
for(i = 2; i < process.argv.length; i++) {
  // TODO read the version from a file
  curr = new Builder(process.argv[i], PF);
  curr.build();
  curr = null;
}
