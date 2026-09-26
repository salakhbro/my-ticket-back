const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
    {
        event_id: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        seat_id: {
            type: Schema.Types.ObjectId,
            ref: "Seat",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        service_fee: {
            type: Number,
            required: true,
        },
        status_id: {
            type: Number,
            required: true,
        },
        ticket_type: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model("Ticket", ticketSchema); 