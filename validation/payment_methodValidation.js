const Joi = require("joi");

const paymentMethodValidation = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
});

module.exports = { paymentMethodValidation };