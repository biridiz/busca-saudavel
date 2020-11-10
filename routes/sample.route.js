const SampleController = require('../controllers/sample.controller');

module.exports = (router) => {

  router.get('/sample/', (req, res) => new SampleController().index(req, res));

  router.get('/sample/:id', (req, res) => new SampleController().show(req, res));

  router.post('/sample/', (req, res) => new SampleController().create(req, res));

  router.put('/sample/:id', (req, res) => new SampleController().update(req, res));

  router.delete('/sample/:id', (req, res) => new SampleController().destroy(req, res));

  return router;
}
