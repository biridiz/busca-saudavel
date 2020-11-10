const { Schema, model } = require("mongoose");

const SampleSchema = new Schema({
    foo: { type: String, required: true },
    bar: { type: Boolean }
}, {
    timestamps: true
});

module.exports = model("Sample", SampleSchema);