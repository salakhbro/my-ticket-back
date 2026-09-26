const Joi = require("joi");

const fields = {
    customer_id: Joi.number()
        .integer()
        .positive(),

    name: Joi.string()
        .trim()
        .min(2)
        .max(100),

    phone: Joi.string()
        .pattern(/^\+998\d{9}$/)
        .messages({
            "string.pattern.base":
                "Phone must be in format +998XXXXXXXXX",
        }),

    number: Joi.string()
        .pattern(/^\d{16}$/)
        .messages({
            "string.pattern.base":
                "Card number must contain exactly 16 digits",
        }),

    year: Joi.string()
        .pattern(/^\d{2}$/)
        .messages({
            "string.pattern.base":
                "Year must contain 2 digits",
        }),

    month: Joi.string()
        .pattern(/^(0[1-9]|1[0-2])$/)
        .messages({
            "string.pattern.base":
                "Month must be between 01 and 12",
        }),

    is_active: Joi.boolean(),

    is_main: Joi.boolean(),
};


// CREATE
const createCustomerCardSchema = Joi.object({
    customer_id: fields.customer_id.required(),
    name: fields.name.required(),
    phone: fields.phone.required(),
    number: fields.number.required(),
    year: fields.year.required(),
    month: fields.month.required(),

    is_active: fields.is_active,
    is_main: fields.is_main,
});


// UPDATE
const updateCustomerCardSchema = Joi.object(
    fields
).min(1);


// Middleware
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(
            req.body,
            {
                abortEarly: true,
                stripUnknown: true,
            }
        );

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        req.body = value;

        next();
    };
};


module.exports = {
    createCustomerCardSchema,
    updateCustomerCardSchema,
    validate,
};