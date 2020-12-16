const LikeRepository = require('../repositories/like.repository');
const PessoaRepository = require('../repositories/pessoa.repository')

class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.pessoaRepository = new PessoaRepository();
    }

    async create(req, res) {
        try {
            const { body, params } = req;
            await this.likeRepository.startSession();

            const recebeu_like = await this.pessoaRepository.findById(params.id);
            const Like = this.likeRepository.create();

            Like.like = body.like;
            Like.deu_like = body.deu_like;
            Like.recebeu_like = recebeu_like.id;

            recebeu_like.like = Like;

            await this.pessoaRepository.save(recebeu_like);
            await this.likeRepository.save(Like);

            if (Like.like === true) {
                this.canBeFriend(Like)
            }

            await this.likeRepository.commitSession();
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
        }
    }

    async canBeFriend(like) {
        try {
            await this.likeRepository.startSession();

            const friend = await this.likeRepository.findLike(like);

            // Se friend não estiver vazio, chamar método de criar amizade
            console.log(friend);

            await this.likeRepository.commitSession();
            return true;

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = LikeController;