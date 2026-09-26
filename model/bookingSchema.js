const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
    {
        cart_id: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
        },

        finished: {
            type: Date,
            required: true,
        },

        payment_method_id: {
            type: Number,
            required: true,
        },

        delivery_method_id: {
            type: Number,
            required: true,
        },

        discount_coupon_id: {
            type: Number,
            default: null,
        },

        status_id: {
            type: Number,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("Booking", bookingSchema);