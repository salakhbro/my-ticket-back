const { Schema, model } = require("mongoose");

const humanCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        start_age: {
            type: Number,
            required: true,
            min: 0,
        },
        finish_age: {
            type: Number,
            required: true,
            min: 0,
        },
        gender: {
            type: Number,
            required: true,
            enum: [1, 2],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("HumanCategory", humanCategorySchema);