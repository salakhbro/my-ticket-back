const { Schema, model } = require("mongoose");

const seatSchema = new Schema(
    {
        sector: {
            type: Number,
            required: true,
        },
        row_number: {
            type: Number,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        venue_id: {
            type: Schema.Types.ObjectId,
            ref: "Venue",
            required: true,
        },
        seat_type_id: {
            type: Schema.Types.ObjectId,
            ref: "SeatType",
            required: true,
        },
        location_in_schema: {
            x: {
                type: Number,
                required: true,
            },
            y: {
                type: Number,
                required: true,
            },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Seat", seatSchema);
