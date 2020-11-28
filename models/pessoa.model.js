const { Schema, model } = require("mongoose");

const PessoaSchema = new Schema({
    nome: { type: String, required: true },
    facebook_token: { type: String, required: true },
    facebook_url: { type: String, required: true },
    instagram_token: { type: String, required: true },
    instagram_url: { type: String, required: true },
    bio: { type: String },
    modalidade: { type: String, required: true },
    ativo: { type: Boolean },

    avaliacao: [{
        type: Schema.Types.ObjectId,
        ref: "Avaliacao"
    }],
    like: [{
        type: Schema.Types.ObjectId,
        ref: "Like"
    }],
    amizade: [{
        type: Schema.Types.ObjectId,
        ref: "Amizade"
    }]
}, {
    timestamps: true
});

module.exports = model("Pessoa", PessoaSchema);