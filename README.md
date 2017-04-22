While putting together a basic product marketing site, I noticed that
it might be useful as a sample or starting point for other people,
so I've captured that as a separate git repository.

Most of this is not my work. I've used metalsmith and several metalsmith 
plugins to create the structure for a marketing site with the following layout:

* / - landing page, /src/index.md
* /about - about page, /src/about.md
* /contact - contact page, /src/contact.md
* /docs/* - doc pages area, /src/docs.md + /src/docs/*.md
* /features - feature page, /src/features.md
* /posts/* - blog area, /src/posts + /src/posts/*
* /pricing - pricing page, /src/pricing.md

In addition, the following files will be generated:

* /rss.xml - RSS feed of 10 most recent blog posts (excerpts only)
* /sitemap.xml - sitemap including all blog posts w/ priorites + dates

Building the site
===================

Dependencies:

* node.js

1. The first time you build the site, you will need to install the Dependencies
from npm:

```npm install```

2. Once you have the dependencies, you can generate the site like so:

```node index.js```

The content for the site will be generated in the /build folder.

3. To easily test the content, I've included a very basic web server:

```node static_server.js```

You can now visit http://localhost:8888 to look at the site. Theer is no caching,
so you can continue to re-generate the site and refresh to see your changes.

This is a mildly modified script from https://gist.github.com/ryanflorence/701407

Details
============

Because I set out to create the structure of a basic marketing site, I made some
opinionated choices for some things but left others until later.

Currently there is no process for handling LESS, SASS, etc files, minification,
automated image sizing, and so on. You can easily add this on, though. Here is the 
[Metalsmith Community Plugins list](http://www.metalsmith.io/#the-community-plugins).


Layouts
----------

There are two layouts:

* /layouts/layout.html - the layout for all pages but blogs
* /layouts/post.html - the layout for blog posts

You can use Handlebars markup in these files to access metadata from Metalsmith
at either the global level (index.js), read from the "frontmatter" (top) of
content files, or injected by various plugins.

This makes it easy to define a "title" value in individual files:

/src/index.html
```
---
layout: layout.html
title: sample title
    ...
---
```

And then reference titles from the layout:

/layouts/layout.html
```
<head>
  <meta charset="UTF-8" />
  <title>{{ title }}</title>
  ...
```

Markdown is processed in layout files as well as individual content files.


Addresses
----------------

In setting this up, I've used the metalsmith permalinks plugin to allow more 
permalink-looking URLs. When a file like "pricing.md" is processed, it is 
output as pricing/index.html in the build folder so you can address it 
simply as "http://yoursite.com/pricing".

Posts
----------------

I've included the "draft" plugin so you can work on posts in draft mode and 
commit them to git, but not publish them until later. Including `draft: true`
in the frontmatter section tells metalsmith to skip the file when processing
the blogs folder.

I've included the RSS plugin and some configurations in index.js to produce 
an rss.xml file with the 10 most recent posts. The RSS feed relies on an 
excerpt being defined in the frontmatter.

Excerpt properties are used in the RSS feed and the landing page, which
shows the top 2 most recent posts.

Sitemap
-----------------

A Sitemap is automatically generated, with some defaults for most pages that
are then overridden on a page-by-page basis. By default pages will be listed
as updating "monthly" and have a last modified date from when the site is 
generated. Some pages, like the landing page and posts archive, have higher
frequencies because they're expected to change more frequently than others.

Robots.txt
-------------

Currently the Robots.txt file is set to wave off search engines, you will need
to change this in your live site.

Deploying to Azure Websites
----------------------------

All that is required to deploy is setting up the website and connecting
to the respository for automatic deployment. I have included a `.deployment`
file for Azure that directs it to only serve up files from the `build`
directory.
