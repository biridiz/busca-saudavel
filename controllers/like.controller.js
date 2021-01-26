const LikeRepository = require('../repositories/like.repository');
const PessoaRepository = require('../repositories/pessoa.repository');
const AmizadeRepository = require('../repositories/amizade.repository');

class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.pessoaRepository = new PessoaRepository();
        this.amizadeRepository = new AmizadeRepository();
    }

    async create(req, res) {
        try {
            const { body, params } = req;
            await this.likeRepository.startSession();
            await this.amizadeRepository.startSession();

            const recebeu_like = await this.pessoaRepository.findById(params.id);
            const deu_like = await this.pessoaRepository.findById(req.header("id"));
            const Like = this.likeRepository.create();

            Like.like = body.like;
            Like.deu_like = deu_like._id;
            Like.recebeu_like = recebeu_like._id;

            recebeu_like.like.push(Like);

            await this.likeRepository.save(Like);
            await this.pessoaRepository.save(recebeu_like);

            if (Like.like === true) {
                await this.canBeFriend(Like)
            }

            await this.likeRepository.commitSession();
            await this.amizadeRepository.commitSession();
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
            await this.likeRepository.endSession();
            await this.amizadeRepository.endSession();
        }
    }

    async canBeFriend(like) {
        const amizade = await this.likeRepository.findLike(like);

        console.log({amizade});
        if (!amizade)
            return;

            const amizadeOrigem = this.amizadeRepository.create();
            const amizadeDestino = this.amizadeRepository.create();

            amizadeOrigem.pessoa1 = amizade.deu_like;
            amizadeOrigem.pessoa2 = amizade.recebeu_like;
            
            amizadeDestino.pessoa1 = amizade.recebeu_like;
            amizadeDestino.pessoa2 = amizade.deu_like;
            
            await this.amizadeRepository.save(amizadeOrigem);
            await this.amizadeRepository.save(amizadeDestino);
    }
}

module.exports = LikeController;