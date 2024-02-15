module.exports = async (data, accessor, methods, url) => {
  var content = await accessor.read("./scf/embed/title.html");

  //Apply position & scale
  content = methods.applyElementTransformData(content, data);

  //Apply title and director
  content = methods.applyProperty(content, "title", data.title);
  
  return content;
}