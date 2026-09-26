const Joi = require("joi");

const createDistrictValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    regionId: Joi.string().required()
});

const updateDistrictValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).optional(),
    regionId: Joi.string().optional()
});

module.exports = {
    createDistrictValidationSchema,
    updateDistrictValidationSchema
};