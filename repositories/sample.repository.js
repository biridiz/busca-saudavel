const BaseRepository = require('./base.repository');
const Sample = require('../models/sample.model');

module.exports = class SampleRepository extends BaseRepository {
    constructor(){
        super(Sample);
    }

    findSamplesWithBarTrue(){
        return this.model.find({
            bar: true
        }).session(this.session);
    }
}