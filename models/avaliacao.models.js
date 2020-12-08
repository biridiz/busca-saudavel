const { Schema, model } = require("mongoose");

const AvaliacaoSchema = new Schema({
    nota: { type: Number, required: true },
    autor: { 
        type: Schema.Types.ObjectId,
        ref: "Pessoa"
    },
    avaliado: {
        type: Schema.Types.ObjectId,
        ref: "Pessoa"
    }
}, {
    timestamps: true
});

module.exports = model("Avaliacao", AvaliacaoSchema);