const Joi = require("joi");

// ================= CREATE =================

const createCartValidationSchema = Joi.object({
    customer_id: Joi.string().required(),
    status_id: Joi.number().integer().required(),
    fineshedAt: Joi.date().optional().allow(null)
});

// ================= UPDATE =================

const updateCartValidationSchema = Joi.object({
    customer_id: Joi.string().optional(),
    status_id: Joi.number().integer().optional(),
    fineshedAt: Joi.date().optional().allow(null)
});

module.exports = {
    createCartValidationSchema,
    updateCartValidationSchema
};