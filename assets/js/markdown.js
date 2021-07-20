const markdown = window.markdownit();

fetch("https://raw.githubusercontent.com/jemc/mare/main/README.md")
  .then((res) => res.text())
  .then(
    (md) =>
      (document.getElementById("target-markdown").innerHTML =
        markdown.render(md))
  );
