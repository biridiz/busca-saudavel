const PessoaController = require('../controllers/pessoa.controller');

module.exports = (router) => {

  // Buscar pessoa (para o match)
  router.get('/pessoa/match', (req, res) => new PessoaController().matchPerson(req, res));

  // Buscar lista de amigos na api para exibir no app
  router.get('/pessoa/friends', (req, res) => new PessoaController().friends(req, res));

  // router.get('/pessoa/', (req, res) => new PessoaController().list(req, res));

  // - Buscar dados do perfil na api
  router.get('/pessoa/:id', (req, res) => new PessoaController().detail(req, res));

  // router.post('/pessoa/', (req, res) => new PessoaController().create(req, res));

  // - Atualizar dados do perfil 
  router.put('/pessoa/:id', (req, res) => new PessoaController().update(req, res));

  // - Chamar método de desativar conta
  router.delete('/pessoa/desativar/:id', (req, res) => new PessoaController().deactivate(req, res));


  return router;
}