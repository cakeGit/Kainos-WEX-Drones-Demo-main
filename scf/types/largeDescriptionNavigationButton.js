module.exports = async (data, accessor, methods, url) => {
  var content = await accessor.read("./scf/embed/largeDescriptionNavigationButton.html");

  //Apply position & scale
  content = methods.applyElementTransformData(content, data);

  //Apply data and desc
  content = methods.applyProperty(content, "description", data.description);
  content = methods.applyGeneralButtonData(content, data);
  
  return content;
}