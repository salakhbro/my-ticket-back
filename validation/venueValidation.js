const Joi = require("joi");

// ================= CREATE VALIDATION =================
const createVenueValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    address: Joi.string().trim().min(3).max(200).required(),
    location: Joi.string().trim().optional().allow("", null),
    site: Joi.string().trim().optional().allow("", null),
    phone: Joi.string()
        .pattern(/^\+998\d{9}$/)
        .required(),
    schema: Joi.string().optional().allow("", null),
    regionId: Joi.string().hex().length(24).required(),
    districtId: Joi.string().hex().length(24).required(),
});

// ================= UPDATE VALIDATION =================
const updateVenueValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).optional(),
    address: Joi.string().trim().min(3).max(200).optional(),
    location: Joi.string().trim().optional().allow("", null),
    site: Joi.string().trim().optional().allow("", null),
    phone: Joi.string()
        .pattern(/^\+998\d{9}$/)
        .optional(),
    schema: Joi.string().optional().allow("", null),
    regionId: Joi.string().hex().length(24).optional(),
    districtId: Joi.string().hex().length(24).optional(),
});

module.exports = {
    createVenueValidationSchema,
    updateVenueValidationSchema,
};