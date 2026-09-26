const Joi = require("joi");

const createRegionValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
});

const updateRegionValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
});

module.exports = {
    createRegionValidationSchema,
    updateRegionValidationSchema
};