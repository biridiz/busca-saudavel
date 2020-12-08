const BaseRepository = require('./base.repository');
const Pessoa = require('../models/pessoa.model');

module.exports = class PessoaRepository extends BaseRepository {
    constructor(){
        super(Pessoa);
    }
}