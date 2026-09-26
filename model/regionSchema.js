const { Schema, model } = require("mongoose");

const regionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

const Region = model("Region", regionSchema);

module.exports = { Region };