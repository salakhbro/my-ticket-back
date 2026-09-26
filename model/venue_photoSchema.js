const { Schema, model } = require("mongoose");
require("./venueSchema"); // Venue modelini ulash

const venuePhotoSchema = new Schema(
    {
        venueId: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
        url: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

const VenuePhoto = model("VenuePhoto", venuePhotoSchema);

module.exports = { VenuePhoto };