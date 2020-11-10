const mongoose = require('mongoose');

module.exports = class BaseRepository {
    constructor(model) {
        /**
         * @type {import('mongoose').Model}
         */
        this.model = model;

        /**
         * @type {import('mongoose').ClientSession}
         */
        this.session = null;
    }

    findById(id) {
        return this.model.findById(id);
    }

    findAll() {
        return this.model.find({})
    }

    create() {
        return new this.model();
    }

    save(model) {
        return model.save();
    }

    destroy(model) {
        return model.delete();
    }

    async startSession() {
        this.session = await mongoose.startSession();
        this.session.startTransaction();

        return this.session;
    }

    async commitSession() {
        if (this.session)
            await this.session.commitTransaction();
    }

    async abortSession() {
        if (this.session)
            await this.session.abortTransaction();
    }

    async endSession() {
        if (this.session)
            await this.session.endSession();
    }
}