
const SampleRepository = require('../repositories/sample.repository');

class SampleController {
    constructor() {
        this.sampleRepository = new SampleRepository();
    }

    async index(req, res) {
        try {
            const data = await this.sampleRepository.findSamplesWithBarTrue();

            res.send({
                status: true,
                data: data
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Falha ao buscar dados'
            });
        } finally {
            await this.sampleRepository.endSession();
        }
    }

    async show(req, res) {
        try {
            const { params } = req;
            const data = await this.sampleRepository.findById(params.id);

            if (data == null) {
                return res.send({
                    status: false,
                    data: 'Não foi possível encontrar o registro'
                });
            }

            res.send({
                status: true,
                data: data
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Falha ao buscar dados'
            });
        } finally {
            await this.sampleRepository.endSession();
        }
    }

    async create(req, res) {
        try {
            const { body } = req;
            await this.sampleRepository.startSession();

            const sample = this.sampleRepository.create();

            sample.foo = body.foo;
            sample.bar = body.bar;

            await this.sampleRepository.save(sample);

            await this.sampleRepository.commitSession();
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
            await this.sampleRepository.endSession();
        }
    }

    async update(req, res) {
        try {
            const { body, params } = req;
            await this.sampleRepository.startSession();

            const sample = await this.sampleRepository.findById(params.id);

            if (sample == null) {
                return res.send({
                    status: false,
                    data: 'Não foi possível encontrar o registro'
                });
            }

            sample.foo = body.foo;
            sample.bar = body.bar;

            await this.sampleRepository.save(sample);

            await this.sampleRepository.commitSession();
            res.send({
                status: true,
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Falha ao atualizar o dado'
            });
        } finally {
            await this.sampleRepository.endSession();
        }
    }

    async destroy(req, res) {
        try {
            const { body, params } = req;
            await this.sampleRepository.startSession();

            const sample = await this.sampleRepository.findById(params.id);
            
            if (sample == null) {
                return res.send({
                    status: false,
                    data: 'Não foi possível encontrar o registro'
                });
            }

            await this.sampleRepository.destroy(sample);

            await this.sampleRepository.commitSession();
            res.send({
                status: true,
            });
        } catch (error) {
            console.error(error);
            res.send({
                status: false,
                message: 'Falha ao deletar o dado'
            });
        } finally {
            await this.sampleRepository.endSession();
        }
    }
}

module.exports = SampleController;