const BaseRepository = require('./base.repository');
const Avaliacao = require('../models/avaliacao.models');

module.exports = class AvaliacaoRepository extends BaseRepository {
    constructor(){
        super(Avaliacao);
    }
}