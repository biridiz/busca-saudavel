const fs = require('fs')
const path = require('path')

const express = require('express');

const basename = path.basename(module.filename)

module.exports = (app) => {
  const routerDir = path.join(__dirname)

  const files = fs
    .readdirSync(routerDir)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file != 'default.route.js');

  files.push('default.route.js');

  files.map((file) => {
    const router = express.Router();

    require(`./${file}`)(router)
    app.use(router)
  })
}
