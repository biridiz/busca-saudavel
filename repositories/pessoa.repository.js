const BaseRepository = require('./base.repository');
const Pessoa = require('../models/pessoa.model');

module.exports = class PessoaRepository extends BaseRepository {
    constructor() {
        super(Pessoa);
    }

    findByEmail(email) {
        return this.model.findOne({
            email: email,
            ativo: true
        }).session(this.session);
    }

    findPersonToMatch(personId) {
        return this.model.find({
            _id: {
                $ne: personId
            },
            ativo: true,
        })
        .populate('like');
        // Adicionar filtro de like.lenght == 0 || !like.contains(persondId)
    }

    findPersonFriends(personId) {
        return this.model.findById(personId)
        .populate('amizade')
        .then(person => person ? person.amizade : [])
    }
}