const { Schema, model } = require("mongoose");

require("./regionSchema");

const districtSchema = new Schema({
    name: {
        type: String,
        required: true,
        regionId: { type: Schema.Types.ObjectId, ref: "Region", required: true },
        trim: true
    },

    regionId: {
        type: Schema.Types.ObjectId,
        ref: "Region",
        required: true
    }
});

const District = model("District", districtSchema);

module.exports = { District };