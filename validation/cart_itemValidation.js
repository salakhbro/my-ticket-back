const Joi = require("joi");

const createCartItemSchema = Joi.object({
    ticket_id: Joi.string().hex().length(24).required(),
    cart_id: Joi.string().hex().length(24).required(),
});

const updateCartItemSchema = Joi.object({
    ticket_id: Joi.string().hex().length(24).optional(),
    cart_id: Joi.string().hex().length(24).optional(),
});

module.exports = {
    createCartItemSchema,
    updateCartItemSchema,
};