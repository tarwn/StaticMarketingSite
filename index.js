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
  
  // key/value metadata available for all files in my site
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

  // process files from /src and output them to /build
  .source('./src')
  .destination('./build')

  // clean the /build folder before rebuilding
  .clean(true)

  // ignore blog posts with "draft: true"
  .use(drafts())

  // process markdown files into HTML
  .use(markdown())

  // define set of all posts and posts for landing page
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

  // convert filename.md to filename/index.html 
  .use(permalinks())

  // process handlebars in content files
  .use(hbtmd(handlebars, {
      pattern: '**/*.html'
  }))

  // process handlebars in layout files
  .use(layouts({
    engine: 'handlebars'
  }))

  // generate a sitemap file
  .use(sitemap({
    hostname: baseUrl,
    // defaults that can be overridden in individual files
    changefreq: "monthly",
    lastmod: new Date(),
    omitIndex: true
  }))

  // generate an RSS feed from the posts collection
  .use(feed({
    collection: "posts",
    limit: 10,
    destination: "rss.xml"
  }))

  // swith to "true" for debug output
  .use(debug(false))

  // and Go!
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