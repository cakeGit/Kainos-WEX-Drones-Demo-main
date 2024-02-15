const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const FileAccessor = require('./pageAccessor.js');
const SuperCoolFramework = require('./scfServer.js');
const ElementTypes = require('./types.js');
const accessor = new FileAccessor();
const types = new ElementTypes();

app.use('/scf/build', (req, res, next) => {
  console.log(req.url.substring(2))
  SuperCoolFramework.build(req.url.substring(2), types, accessor, (page) => {
    res.send(page);
    res.end();
  });
});

app.use('/scf/index', (req, res, next) => {
  indexes = fs.readdirSync("./scf/page/").join(",");
  res.send(indexes);
  res.end();
});

app.use(express.static(path.join(__dirname, 'client')));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});