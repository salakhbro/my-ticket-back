const { Schema, model } = require("mongoose");

const customerCardSchema = new Schema(
    {
        customer_id: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        number: {
            type: String,
            required: true,
            trim: true,
        },

        year: {
            type: String,
            required: true,
            trim: true,
        },

        month: {
            type: String,
            required: true,
            trim: true,
        },

        is_active: {
            type: Boolean,
            default: true,
        },

        is_main: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model(
    "CustomerCard",
    customerCardSchema
);