module.exports = async (data, accessor, methods, url) => {
  var content = await accessor.read("./scf/embed/greeting.html");

  //Apply position & scale
  content = methods.applyElementTransformData(content, data);

  //Apply title and director
  var isMorning = new Date().getHours() < 12;
  content = methods.applyProperty(content, "time", isMorning ? "Morning" : "Evening");
  
  return content;
}