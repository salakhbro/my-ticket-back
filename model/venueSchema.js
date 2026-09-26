const { Schema, model } = require("mongoose");

// Agar region va district model fayllari bo'lsa, ularni ulaysiz
// require("./regionSchema");
// require("./districtSchema");

const venueSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        location: { type: String, default: "" },
        site: { type: String, default: "" },
        phone: { type: String, required: true },
        schema: { type: String, default: "" },
        regionId: { type: Schema.Types.ObjectId, ref: "Region", required: true },
        districtId: { type: Schema.Types.ObjectId, ref: "District", required: true },
    },
    { timestamps: true }
);

const Venue = model("Venue", venueSchema);

module.exports = { Venue };