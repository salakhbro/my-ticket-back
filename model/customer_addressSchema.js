const { Schema, model } = require("mongoose");

require("./customerSchema");
require("./districtSchema");

const customerAddressSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        name: {
            type: String,
            default: "",
            trim: true,
        },

        regionId: {
            type: Schema.Types.ObjectId,
            ref: "Region",
        },

        districtId: {
            type: Schema.Types.ObjectId,
            ref: "District",
            required: true,
        },

        street: {
            type: String,
            default: "",
            trim: true,
        },

        house: {
            type: String,
            default: "",
            trim: true,
        },

        flat: {
            type: Number,
        },

        location: {
            type: String,
            default: "",
        },

        postIndex: {
            type: String,
            default: "",
        },

        info: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const CustomerAddress = model(
    "CustomerAddress",
    customerAddressSchema
);

module.exports = { CustomerAddress };