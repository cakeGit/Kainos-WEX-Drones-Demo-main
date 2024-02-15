const fs = require("fs");

class FileAccessor {
  constructor() {
    this.cache = {};
  }

  contains(url) {
    return this.cache[url] != undefined;
  }
  
  read(url) {
    var promise = new Promise((resolve, reject) => {
      //Uncomment when you are finished devin - although its kinda unnecassary anyways
      // if (cache[url] != undefined) {
      //   resolve(cache[url])
      //   return;
      // }
      
      fs.readFile(url, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          resolve("");
          return;
        }
        this.cache[url] = data;
        resolve(data);
      });
    });
    return promise;
  }

  fetch(url, then) {
    if (this.contains(url))
      then(this.cache[url]);
    else
      this.read(url, then);
  }
  
}

module.exports = FileAccessor
