const PessoaController = require('../controllers/pessoa.controller');

module.exports = (router) => {

    router.get('/pessoa/', (req, res) => new PessoaController().list(req, res));

    router.post('/pessoa/', (req, res) => new PessoaController().create(req, res));

    router.delete('/pessoa/:id', (req, res) => new PessoaController().delete(req, res));

  return router;
}