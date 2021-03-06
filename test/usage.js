var argumentum = require('../lib/argumentum').ArgumentParser;

function strip(str) {
  return str.replace(/\s+/g, '');  
};

var opts = {
   apple: {
      abbr: 'a',
      help: 'how many apples'
   },
   
   banana: {
      full: 'b-nana'
   },
   
   carrot: {
      string: '-c NUM, --carrots=NUM'
   },
   
   dill: {
      metavar: 'PICKLE'
   },
   
   egg: {
      position: 0,
      help: 'robin'
   }
}

var parser = argumentum().options(opts).help('all the best foods').scriptName('test');

var expected = 'Usage:test<egg>[options]eggrobinOptions:-a,--applehowmanyapples--b-nana-cNUM,--carrots=NUM--dillPICKLEDescription:allthebestfoods'

exports.testH = function(test) {
   test.expect(1);

   parser.printer(function(string) {
      test.equal(strip(string), expected)
      test.done();
   })
   .parse(['-h']);
}

exports.testHelp = function(test) {
   test.expect(1);

   parser.printer(function(string) {
      test.equal(strip(string), expected)
      test.done();
   })
   .parse(['--help']);
}

exports.testScriptName = function(test) {
   test.expect(1);

   argumentum()
     .script('test')
     .printer(function(string) {
        test.equal(strip(string),'Usage:test')
        test.done();
     })
     .parse(['-h']);
}

exports.testUsage = function(test) {
   test.expect(1);

   parser
      .usage('test usage')
      .printer(function(string) {
         test.equal(string, 'test usage')
         test.done();
      })
      .parse(['--help']); 
}

exports.testHidden = function(test) {
   test.expect(1);

   argumentum().options({
      file: {
         hidden: true
      }
   })
   .scriptName('test')
   .printer(function(string) {
      test.equal(strip('Usage:test[options]Options:'), strip(string))
      test.done();
   })
   .parse(['-h']);
}
