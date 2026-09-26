const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        last_name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        hashed_password: {
            type: String,
            required: true,
            select: false,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        birth_date: {
            type: Date,
        },

        gender: {
            type: Number,
            enum: [1, 2],
        },

        lang_id: {
            type: Number,
            default: 1,
        },

        hashed_refresh_token: {
            type: String,
            default: null,
            select: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,

        toJSON: {
            transform: (_doc, ret) => {
                delete ret.hashed_password;
                delete ret.hashed_refresh_token;
                return ret;
            },
        },
    }
);

module.exports = model("Customer", customerSchema);