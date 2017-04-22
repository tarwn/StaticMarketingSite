---
layout: layout.html

changefreq: weekly
priority: 1.0
---

<h2>Post Archive</h2>

{{#each collections.posts}}
  <li><a href="/{{ path }}">{{ title }}</a><div>{{ date }}</div></li>
{{/each}}
