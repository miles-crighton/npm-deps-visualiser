# npm-deps-visualiser

Use a node app to read the relevant files,
Could either be an online service where you drag and drop your file,
or an npm package, I think the npm package works a bit better.
Online drag and drop could actually be built around the base app,
the node server can be hosted as its own service, use a templating engine to
inject the json into the webpage and return it.
Use fs.readfilesync to load up a html file and serve it, use basic http or express
Use a template engine to generate the webpage,

Maybe try and include vulnerability warnings also.

How to get npm audits via a rest API:
https://dzone.com/articles/how-to-use-npm-rest-api-to-get-audit-npm-audit-res

Graphs possible with D3:
https://www.d3-graph-gallery.com/sankey.html
