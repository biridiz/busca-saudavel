
class IndexController {
    index(req, res) {
        res.send({
            status: true,
            message: 'Hello!'
        });
    }

    handle404(req, res) {
        res.status(404).send({
            status: false,
            message: 'Sorry, we cannot find that!'
        });
    }

    handleOptions(req, res) {
        res.send('GET, POST, OPTIONS, PUT, PATCH, DELETE');
    }
}

module.exports = IndexController;