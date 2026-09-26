const Joi = require("joi");

const eventTypeValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    parent_event_type_id: Joi.string()
        .hex()
        .length(24)
        .allow(null, "")
        .optional()
});

const updateEventTypeValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    parent_event_type_id: Joi.string()
        .hex()
        .length(24)
        .allow(null, "")
        .optional()
});

module.exports = {
    eventTypeValidationSchema,
    updateEventTypeValidationSchema
};