const { Schema, model } = require("mongoose");

const AmizadeSchema = new Schema({
    pessoa1: { 
        type: Schema.Types.ObjectId,
        ref: "Pessoa"
    },
    pessoa2: { 
        type: Schema.Types.ObjectId,
        ref: "Pessoa"
    }
}, {
    timestamps: true
});

module.exports = model("Amizade", AmizadeSchema);