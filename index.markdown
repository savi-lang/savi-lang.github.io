---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

{% for concept in site.concepts %}
  <h2>
    <a href="{{ concept.url }}" class="current">
      {{ concept.name }}
    </a>
  </h2>
  <p>{{ concept.content | markdownify }}</p>
{% endfor %}
