module.exports = async (data, accessor, methods, url) => {
  var content = await accessor.read("./scf/embed/largeNavigationButton.html");

  //Apply position & scale
  content = methods.applyElementTransformData(content, data);

  //Apply title and director
  content = methods.applyGeneralButtonData(content, data);
  
  return content;
}