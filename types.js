const fs = require('fs');

class ElementTypes {

  constructor() {
    this.types = {};
    for (var typeSource of fs.readdirSync("./scf/types/")) {
      var typeName = typeSource.substring(0, typeSource.length - 3);
      this.types[typeName] = require("./scf/types/" + typeSource);
    }
  }

  get(typeName) {
    return this.types[typeName];
  }
  
}

module.exports = ElementTypes