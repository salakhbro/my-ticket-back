const Joi = require("joi");

const createSeatTypeSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
});

const updateSeatTypeSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
});

module.exports = {
    createSeatTypeSchema,
    updateSeatTypeSchema
};