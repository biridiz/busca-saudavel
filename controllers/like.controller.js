const LikeRepository = require('../repositories/like.repository');
const PessoaRepository = require('../repositories/pessoa.repository');
const AmizadeController = require('../controllers/amizade.controller')

class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.pessoaRepository = new PessoaRepository();
        this.amizadeController = new AmizadeController();
    }

    async create(req, res) {
        try {
            const { body, params } = req;
            await this.likeRepository.startSession();

            const recebeu_like = await this.pessoaRepository.findById(params.id);
            const deu_like = await this.pessoaRepository.findById(req.header("id"));
            const Like = this.likeRepository.create();

            Like.like = body.like;
            Like.deu_like = deu_like._id;
            Like.recebeu_like = recebeu_like._id;

            recebeu_like.like = Like;

            await this.likeRepository.save(Like);
            await this.pessoaRepository.save(recebeu_like);

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

            const amizade = await this.likeRepository.findLike(like);

            if(amizade.recebeu_like && amizade.deu_like) {
                this.amizadeController.create(amizade);
            }

            await this.likeRepository.commitSession();
            return true;

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = LikeController;