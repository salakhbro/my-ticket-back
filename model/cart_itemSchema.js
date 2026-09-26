const { Schema, model } = require("mongoose");

require("./ticketSchema");
require("./cartSchema");

const cartItemSchema = new Schema({
    ticket_id: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
    cart_id: { type: Schema.Types.ObjectId, ref: "Cart", required: true }
}, {
    timestamps: true
});

const CartItem = model("CartItem", cartItemSchema);

module.exports = { CartItem };