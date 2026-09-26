const { Schema, model } = require("mongoose");

const seatTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const seat_type = model("SeatType", seatTypeSchema);

module.exports = { seat_type };