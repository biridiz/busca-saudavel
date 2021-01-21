const AuthController = require('../controllers/auth.controller');

module.exports = (router) => {

  router.post('/auth/login', (req, res) => new AuthController().authenticateByLogin(req, res));
  router.post('/auth/', (req, res) => new AuthController().authenticate(req, res));

  return router;
}
