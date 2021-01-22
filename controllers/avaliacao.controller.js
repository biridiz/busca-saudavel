const PessoaRepository = require('../repositories/pessoa.repository');
const AvaliacaoRepository = require('../repositories/avaliacao.repository');

class AvaliacaoController {
    constructor() {
        this.pessoaRepository = new PessoaRepository();
        this.avaliacaoRepository = new AvaliacaoRepository();
    }

    async create(req, res) {
        try {
            const { body } = req;
            await this.avaliacaoRepository.startSession();

            const autor = this.pessoaRepository.findById(req.header("id"));
            const avaliado = this.pessoaRepository.findById(body.id);

            const avaliacao = this.avaliacaoRepository.create();
            avaliacao.autor = autor;
            avaliacao.avaliado = avaliado;
            avaliacao.nota = body.nota;

            await this.avaliacaoRepository.save(avaliacao);

            await this.avaliacaoRepository.commitSession();
            res.send({
                status: true,
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Falha ao criar o dado'
            });
        } finally {
            await this.avaliacaoRepository.endSession();
        }
    }
}

module.exports = AvaliacaoController;