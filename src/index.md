---
layout: layout.html
title: sample title

changefreq: weekly
priority: 1.0
---

This is the main page


Section here

Section here


Check out our latest blog posts:

{{#each collections.latestPosts}}
  <li><a href="/{{ path }}">{{ title }}</a><div>{{ excerpt }}</div></li>
{{/each}}
