var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var handlebars = require('handlebars');
var hbtmd = require('metalsmith-hbt-md');
var collections  = require('metalsmith-collections');
var sitemap = require('metalsmith-mapsite');
var feed = require('metalsmith-feed');
var drafts = require('metalsmith-drafts');

var baseUrl = "http://devassure.com"

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/",

    // make rss feed happy
    site: {
      url: baseUrl
    }
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(drafts())
  .use(markdown())
  .use(collections({
    latestPosts: {
      pattern: 'posts/**/*.html',
      sortBy: 'date',
      reverse: true,
      limit: 2
    },
    posts: {
      pattern: 'posts/**/*.html',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(permalinks())
  .use(hbtmd(handlebars, {
      pattern: '**/*.html'
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(sitemap({
    hostname: baseUrl,
    changefreq: "monthly",
    lastmod: new Date(),
    omitIndex: true
  }))
  .use(feed({
    collection: "posts",
    limit: 10,
    destination: "rss.xml"
  }))
  .use(debug(false))
  .build(function(err, files) {
    if (err) { throw err; }
  });



function debug(logToConsole) {
  return function(files, metalsmith, done) {
    if (logToConsole) {
      console.log('\nMETADATA:');
      console.log(metalsmith.metadata());

      for (var f in files) {
        console.log('\nFILE:');
        console.log(files[f]);
      }
    }

    done();
  };
};