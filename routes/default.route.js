const express = require('express');

const IndexController = require('../controllers/index.controller');

module.exports = (router) => {
  router.get('/', (req, res) => new IndexController().index(req, res));
  
  router.options('*', (req, res) => new IndexController().handleOptions(req, res));
  
  router.use('/public', express.static('./public'));
  
  router.all('*', (req, res) => new IndexController().handle404(req, res));

  return router;
}
