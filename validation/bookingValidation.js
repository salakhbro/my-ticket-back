const Joi = require("joi");

const bookingValidationSchema = Joi.object({
    cart_id: Joi.string().hex().length(24).required(),
    finished: Joi.date().required(),
    payment_method_id: Joi.number().integer().required(),
    delivery_method_id: Joi.number().integer().required(),
    discount_coupon_id: Joi.number().integer().allow(null),
    status_id: Joi.number().integer().required(),
});

const bookingUpdateValidationSchema = Joi.object({
    cart_id: Joi.string().hex().length(24),
    finished: Joi.date(),
    payment_method_id: Joi.number().integer(),
    delivery_method_id: Joi.number().integer(),
    discount_coupon_id: Joi.number().integer().allow(null),
    status_id: Joi.number().integer(),
});

module.exports = {
    bookingValidationSchema,
    bookingUpdateValidationSchema,
};