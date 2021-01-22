const AvaliacaoController = require('../controllers/avaliacao.controller');

module.exports = (router) => {

  // - - Implementar funcionalidade de avaliação na api
  router.post('/avaliacao/', (req, res) => new AvaliacaoController().create(req, res));


  return router;
}