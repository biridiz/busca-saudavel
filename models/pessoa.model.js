const { Schema, model } = require("mongoose");

const PessoaSchema = new Schema({
    nome: { type: String, required: true },
    image: { type: String, required: true },
    telefone: { type: String, required: true },
    email: { type: String },
    facebook_token: { type: String },
    facebook_url: { type: String },
    instagram_token: { type: String },
    instagram_url: { type: String },
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