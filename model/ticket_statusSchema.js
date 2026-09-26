const { Schema, model } = require("mongoose");

const ticketStatusSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const ticket_status = model("TicketStatus", ticketStatusSchema);

module.exports = { ticket_status };