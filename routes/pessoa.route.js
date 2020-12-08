const PessoaController = require('../controllers/pessoa.controller');

module.exports = (router) => {

    router.get('/pessoa/', (req, res) => new PessoaController().list(req, res));

    router.post('/pessoa/', (req, res) => new PessoaController().create(req, res));

  return router;
}