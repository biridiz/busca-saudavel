const PessoaController = require('../controllers/pessoa.controller');

module.exports = (router) => {

    router.get('/pessoa/', (req, res) => new PessoaController().list(req, res));

    router.get('/pessoa/:id', (req, res) => new PessoaController().detail(req, res));

    router.post('/pessoa/', (req, res) => new PessoaController().create(req, res));

    router.put('/pessoa/:id', (req, res) => new PessoaController().update(req, res));

    router.delete('/pessoa/:id', (req, res) => new PessoaController().delete(req, res));

    router.get('/desativar/:id', (req, res) => new PessoaController().deactivate(req, res));


  return router;
}