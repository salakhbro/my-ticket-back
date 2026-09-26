const Joi = require("joi");

const createHumanCategoryValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    start_age: Joi.number().integer().min(0).required(),
    finish_age: Joi.number()
        .integer()
        .min(Joi.ref("start_age"))
        .required(),

    gender: Joi.number().valid(1, 2).required(),
});

const updateHumanCategoryValidation = Joi.object({
    name: Joi.string().min(2).max(100),
    start_age: Joi.number().integer().min(0),
    finish_age: Joi.number().integer().min(0),
    gender: Joi.number().valid(1, 2),
}).min(1);

module.exports = {
    createHumanCategoryValidation,
    updateHumanCategoryValidation,
};