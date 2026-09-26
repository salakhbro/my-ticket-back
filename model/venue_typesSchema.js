const { Schema, model } = require("mongoose");

const venueTypesSchema = new Schema(
    {
        venueId: {
            type: Schema.Types.ObjectId,
            ref: "Venue",
            required: true
        },

        typeId: {
            type: Schema.Types.ObjectId,
            ref: "Type",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("VenueTypes", venueTypesSchema);