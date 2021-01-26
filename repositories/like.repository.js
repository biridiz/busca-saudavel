const BaseRepository = require('./base.repository');
const Like = require('../models/like.model');

module.exports = class LikeRepository extends BaseRepository {
    constructor(){
        super(Like);
    }

    findLike(like){
        return this.model.findOne({
            recebeu_like: like.deu_like,
            deu_like: like.recebeu_like
        }).session(this.session);
    }
}