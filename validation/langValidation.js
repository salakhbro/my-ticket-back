const Joi = require("joi");

const langValidation = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
});

module.exports = { langValidation };