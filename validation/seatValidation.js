const Joi = require("joi");

const createSeatValidation = Joi.object({
    sector: Joi.number().required(),
    row_number: Joi.number().required(),
    number: Joi.number().integer().required(),
    venue_id: Joi.string().hex().length(24).required(),
    seat_type_id: Joi.string().hex().length(24).required(),
    location_in_schema: Joi.object({
        x: Joi.number().required(),
        y: Joi.number().required(),
    }).required(),
});

const updateSeatValidation = Joi.object({
    sector: Joi.number().integer(),
    row_number: Joi.number().integer(),
    number: Joi.number().integer(),
    venue_id: Joi.string().hex().length(24),
    seat_type_id: Joi.string().hex().length(24),
    location_in_schema: Joi.object({
        x: Joi.number(),
        y: Joi.number(),
    }),
}).min(1);

module.exports = {
    createSeatValidation,
    updateSeatValidation,
};
