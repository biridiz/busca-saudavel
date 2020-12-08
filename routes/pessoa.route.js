const PessoaController = require('../controllers/pessoa.controller');

module.exports = (router) => {

  router.post('/pessoa/', (req, res) => new PessoaController().create(req, res));

  return router;
}