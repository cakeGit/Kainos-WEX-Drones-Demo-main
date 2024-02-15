function applyDefaults(data, defaults) {
  for (property in defaults) {
    if (data[property] == undefined)
      data[property] = defaults[property];
  }
  return data;
}

function applyGeneralButtonData(content, data) {
  data = applyDefaults(data, {
    "color": "#232834",
    "accentColor": "#1f242f"
  });
  content = this.applyProperty(content, "title", data.title);
  content = this.applyProperty(content, "to", data.to);
  content = this.applyProperty(content, "image", data.icon);
  content = this.applyProperty(content, "color", data.color);
  content = this.applyProperty(content, "accentColor", data.accentColor);
  return content;
}
  
function applyElementTransformData(content, data) {
  content = this.applyElementPositionData(content, data);
  content = this.applyElementScaleData(content, data);
  return content;
}

function applyElementPositionData(content, data) {
  return this.applyPositionalProperty(content, data, ["top", "left"]);
}

function applyElementScaleData(content, data) {
  return this.applyPositionalProperty(content, data, ["width", "height"]);
}
  
function applyPositionalProperty(content, data, propertyNames) {
  var x = data[propertyNames[0]];
  var y = data[propertyNames[1]];
  var screen = this.getScreenPosition(x, y);
  content = applyProperty(content, propertyNames[0], screen.x);
  content = applyProperty(content, propertyNames[1], screen.y);
  return content
}


function applyProperty(content, property, value) {
  return content.replaceAll("${" + property + "}", value);
}

function getScreenPosition(x, y) {
  return {x: (x * 100) + "%", y: (y * 100) + "%"};
}

module.exports = {
  applyGeneralButtonData: applyGeneralButtonData,
  applyElementTransformData: applyElementTransformData,
  applyElementPositionData: applyElementPositionData,
  applyElementScaleData: applyElementScaleData,
  applyPositionalProperty: applyPositionalProperty,
  applyProperty: applyProperty,
  getScreenPosition: getScreenPosition
}