const Joi = require("joi");

const ticketStatusValidation = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
});

module.exports = {
    ticketStatusValidation
};