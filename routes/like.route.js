const LikeController = require('../controllers/like.controller');

module.exports = (router) => {

  router.post('/like/:id', (req, res) => new LikeController().create(req, res));

  return router;
}