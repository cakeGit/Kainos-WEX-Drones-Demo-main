module.exports = async (data, accessor, methods, url) => {
  var content = await accessor.read("./scf/embed/itemList.html");

  var sourceElementContent = await accessor.read("./scf/embed/itemListElement.html");
  var sourceElementComponentContent = await accessor.read("./scf/embed/itemListElementComponent.html");
  
  //Apply position & scale
  content = methods.applyElementTransformData(content, data);

  
  var dataSource = JSON.parse(await accessor.read("./scf/content/" + data.source + ".json"));

  var innerContent = "";
  var padding = 5;
  var elementCount = dataSource.length;
  var spacing = (100 - (padding * 2)) / elementCount;
  var i = 0;
  for (element of dataSource) {
    var elementContent = sourceElementContent;

    var innerElementContent = "";
    var left = 0;
    for (section of element.sections) {
      var elementComponentContent = sourceElementComponentContent;
      var componentStyleVariables = "--color: " + section.color + "; --accent-color: " + section.accentColor +";";
      
      elementComponentContent = methods.applyProperty(elementComponentContent, "type", section.type);
      elementComponentContent = methods.applyProperty(elementComponentContent, "left", left + "%");
      elementComponentContent = methods.applyProperty(elementComponentContent, "width", (section.width * 100) + "%");

      if (section.type != "image")
        elementComponentContent = methods.applyProperty(elementComponentContent, "text", section.text);
      if (section.type == "button")
        componentStyleVariables += "--icon: url(../image/"+section.icon+");";
      if (section.type == "image") {
        componentStyleVariables += "--bg-image: url(../image/"+section.image+");";
        elementComponentContent = methods.applyProperty(elementComponentContent, "text", "");
      }

      elementComponentContent = methods.applyProperty(elementComponentContent, "variables", componentStyleVariables);
      
      left += section.width * 100;
      innerElementContent += elementComponentContent;
    }

    elementContent = methods.applyProperty(elementContent, "title", element.title);
    elementContent = methods.applyProperty(elementContent, "top", (padding +((i+0.5)*spacing)) + "%");
    elementContent = methods.applyProperty(elementContent, "inner", innerElementContent);
    i++;
    innerContent += elementContent;
  }

  content = methods.applyProperty(content, "inner", innerContent);
  
  return content;
}