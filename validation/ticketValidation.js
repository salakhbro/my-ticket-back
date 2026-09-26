const Joi = require("joi");

const ticketValidationSchema = Joi.object({
    event_id: Joi.string().required(),
    seat_id: Joi.string().required(),
    price: Joi.number().required(),
    service_fee: Joi.number().required(),
    status_id: Joi.number().integer().required(),
    ticket_type: Joi.number().integer().required(),
});

const updateTicketValidationSchema = Joi.object({
    event_id: Joi.string(),
    seat_id: Joi.string(),
    price: Joi.number(),
    service_fee: Joi.number(),
    status_id: Joi.number().integer(),
    ticket_type: Joi.number().integer(),
});

module.exports = {
    ticketValidationSchema,
    updateTicketValidationSchema,
};