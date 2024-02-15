const typeMethods = require("./typeMethods");

async function parseContent(content, accessor, types, url) {
  var htmlContent = "";
  for (element of content) {
    processor = types.get(element.type);
    htmlContent += await processor(element, accessor, typeMethods, url);
  }
  return htmlContent;
}

module.exports = {
  build: async function (url, types, accessor, resolve) {
    //Build the page at ./scf/page/"url".json
    var sourceDir = "./scf/";
    
    accessor.read(sourceDir + "page/" + url).then(async (data) => {
      var pageData = JSON.parse(data);
      var buildData = {};

      buildData.directory = pageData.directory;
      buildData.content = await parseContent(pageData.content, accessor, types, url);

      if (pageData.initialiser != undefined)
        accessor.read(sourceDir + "scripts/" + pageData.initialiser)
          .then(data => {
            buildData.initialise = data;
            resolve(buildData);
          });
      else
        resolve(buildData);
    });
  }
}