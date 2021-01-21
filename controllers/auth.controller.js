
const PessoaRepository = require('../repositories/pessoa.repository');

const InstagramService = require('../services/auth/instagram.service');
const FacebookService = require('../services/auth/facebook.service');

class AuthController {
    constructor() {
        this.pessoaRepository = new PessoaRepository();
        this.instagramService = new InstagramService();
        this.facebookService = new FacebookService();
    }

    async authenticateByLogin(req, res) {
        try {
            const { body } = req;

            const email = body.email;

            const user = await this.pessoaRepository.findByEmail(email);

            if (!user)
                return res.send({ status: false, message: 'Nenhum usuário encontrado com esse e-mail' });

            res.send({
                status: true,
                user: user
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Não foi possível efetuar o login'
            });
        }
    }

    async authenticate(req, res) {
        try {
            const { body } = req;

            const token = body.token;

            // await this.sampleRepository.startSession();

            const userData = await this.instagramService.authenticate(token);

            console.log(userData);
            if (userData.success == false)
                return res.send({ status: false, message: 'Falha ao buscar informações', error: userData.error });

            // await this.sampleRepository.save(sample);

            // await this.sampleRepository.commitSession();
            res.send({
                status: true,
                user: userData.data
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Não foi possível efetuar o login'
            });
        } finally {
            // await this.sampleRepository.endSession();
        }
    }
}

module.exports = AuthController;