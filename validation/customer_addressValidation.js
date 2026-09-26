const Joi = require("joi");

const createCustomerAddressValidationSchema = Joi.object({
    customerId: Joi.string().required(),

    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    regionId: Joi.string() // agar MongoDB ObjectId bo'lsa string, number bo'lsa .number() qilishingiz mumkin
        .optional(),

    districtId: Joi.string().required(),

    street: Joi.string()
        .trim()
        .max(200)
        .optional(),

    house: Joi.string()
        .trim()
        .max(50)
        .optional(),

    flat: Joi.number()
        .integer()
        .optional(),

    location: Joi.string()
        .max(300)
        .optional(),

    postIndex: Joi.string()
        .max(20)
        .optional(),

    info: Joi.string()
        .max(1000)
        .optional(),
});

const updateCustomerAddressValidationSchema = Joi.object({
    customerId: Joi.string().optional(),

    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    regionId: Joi.string()
        .optional(),

    districtId: Joi.string().optional(),

    street: Joi.string()
        .trim()
        .max(200)
        .optional(),

    house: Joi.string()
        .trim()
        .max(50)
        .optional(),

    flat: Joi.number()
        .integer()
        .optional(),

    location: Joi.string()
        .max(300)
        .optional(),

    postIndex: Joi.string()
        .max(20)
        .optional(),

    info: Joi.string()
        .max(1000)
        .optional(),
});

module.exports = {
    createCustomerAddressValidationSchema,
    updateCustomerAddressValidationSchema,
};