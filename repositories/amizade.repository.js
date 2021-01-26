const BaseRepository = require('./base.repository');
const Amizade = require('../models/amizade.model');

module.exports = class AmizadeRepository extends BaseRepository {
    constructor(){
        super(Amizade);
    }
}