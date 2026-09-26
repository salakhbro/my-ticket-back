const { Schema, model } = require("mongoose");

const delivery_methodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const delivery_method = model(
    "delivery_method",
    delivery_methodSchema
);

module.exports = { delivery_method };