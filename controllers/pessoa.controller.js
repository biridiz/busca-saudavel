
const PessoaRepository = require('../repositories/pessoa.repository');

class PessoaController {
    constructor() {
        this.pessoaRepository = new PessoaRepository();
    }

    async list(req, res) {
        try {
            const data = await this.pessoaRepository.findAll();

            res.send({
                status: true,
                data: data
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Falha ao buscar dados'
            });
        } finally {
            await this.pessoaRepository.endSession();
        }
    }

    async create(req, res) {
        try {
            const { body } = req;
            await this.pessoaRepository.startSession();

            const pessoa = this.pessoaRepository.create();

            // Falta urls e tokens das redes sociais
            pessoa.nome = body.nome;
            pessoa.telefone = body.telefone;
            pessoa.bio = body.bio;
            pessoa.modalidade = body.modalidade;
            pessoa.ativo = true;


            await this.pessoaRepository.save(pessoa);

            await this.pessoaRepository.commitSession();
            res.send({
                status: true,
                user: pessoa
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Falha ao criar usuário'
            });
        } finally {
            await this.pessoaRepository.endSession();
        }
    }
}

module.exports = PessoaController;