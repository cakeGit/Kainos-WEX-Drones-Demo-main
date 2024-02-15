module.exports = async (data, accessor, methods, url) => {
  content = await accessor.read("./scf/embed/navigationSidebar.html");

  //Apply position & scale
  var content = methods.applyElementTransformData(content, data);

  //store the html of the navigation sidebar buttons
  var sourceElementContent = await accessor.read("./scf/embed/navigationSidebarElement.html");
  
  innerContent = "";
  var tabsCount = Object.keys(data.tabs).length;
  var padding = 5;
  var itemSpacing = (100-(padding*2)) / (tabsCount);

  var i = 0;
  for (director in data.tabs) {
    var elementContent = sourceElementContent;
    elementContent = methods.applyProperty(elementContent, "isCurrent", (director + ".json") == url);
    elementContent = methods.applyProperty(elementContent, "isHome", (director) == "user");
    elementContent = methods.applyProperty(elementContent, "to", director);
    elementContent = methods.applyProperty(elementContent, "name", data.tabs[director]);

    elementContent = methods.applyProperty(elementContent, "top", (padding + ((i+0.5) * itemSpacing)) + "%");
    innerContent += elementContent;
    i++;
  }
  
  //Apply title and director
  content = methods.applyProperty(content, "inner", innerContent);
  
  return content;
}