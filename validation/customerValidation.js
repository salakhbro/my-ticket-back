const Joi = require("joi");

const passwordRule = Joi.string()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
    .messages({
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password must not exceed 30 characters",
        "string.pattern.base":
            "Password must contain a letter, a digit and a special character",
    });

const fields = {
    first_name: Joi.string()
        .trim()
        .min(2)
        .max(50),

    last_name: Joi.string()
        .trim()
        .min(2)
        .max(50),

    phone: Joi.string()
        .pattern(/^\+998\d{9}$/)
        .messages({
            "string.pattern.base":
                "Phone must be in format +998XXXXXXXXX",
        }),

    email: Joi.string()
        .trim()
        .email(),

    password: passwordRule,

    birth_date: Joi.date()
        .iso()
        .max("now"),

    gender: Joi.number()
        .valid(1, 2),

    lang_id: Joi.number()
        .integer()
        .min(1),
};

const createCustomerSchema = Joi.object({
    first_name: fields.first_name.required(),
    last_name: fields.last_name.required(),
    phone: fields.phone.required(),
    email: fields.email.required(),
    password: fields.password.required(),

    birth_date: fields.birth_date,
    gender: fields.gender,
    lang_id: fields.lang_id,
});

const updateCustomerSchema = Joi.object(fields).min(1);

const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: true,
            stripUnknown: true,
        });

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
    createCustomerSchema,
    updateCustomerSchema,
    validate,
};