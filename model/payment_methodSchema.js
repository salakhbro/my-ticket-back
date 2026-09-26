const { Schema, model } = require("mongoose");

const payment_methodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const payment_method = model("payment_method", payment_methodSchema);

module.exports = { payment_method };