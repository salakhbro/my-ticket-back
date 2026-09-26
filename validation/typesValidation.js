const Joi = require("joi");

// Create (Yangi Type qo'shish) uchun validation
const createTypeValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
});

// Update (Yangilash) uchun validation
const updateTypeValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).optional()
});

module.exports = {
    createTypeValidationSchema,
    updateTypeValidationSchema
};