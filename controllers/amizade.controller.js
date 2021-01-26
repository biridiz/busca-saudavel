const AmizadeRepository = require('../repositories/amizade.repository');

class AmizadeController {
    constructor() {
        this.amizadeRepository = new AmizadeRepository();
    }

    async create(amizade) {
        try {
            await this.amizadeRepository.startSession();

            const Amizade = this.amizadeRepository.create();

            Amizade.pessoa1 = amizade.deu_like;
            Amizade.pessoa2 = amizade.recebeu_like;

            await this.amizadeRepository.save(Amizade);

            await this.amizadeRepository.commitSession();
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
            await this.amizadeRepository.endSession();
        }
    }
}

module.exports = AmizadeController;