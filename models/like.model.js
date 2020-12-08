const { Schema, model } = require("mongoose");

const LikeSchema = new Schema({
    like: { type: Boolean },
    deu_like: {
        type: Schema.Types.ObjectId,
        ref: "Pessoa"
    },
    recebeu_like: {
        type: Schema.Types.ObjectId,
        ref: "Pessoa"
    }
}, {
    timestamps: true
});

module.exports = model("Like", LikeSchema);