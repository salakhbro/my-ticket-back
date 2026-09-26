const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

const createEventValidation = Joi.object({
    name: Joi.string().trim().min(2).max(200).required(),
    photo: Joi.string().trim().uri().required(),
    start_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    start_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    finish_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    finish_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    info: Joi.string().trim().min(5).required(),
    event_type_id: Joi.string().custom(objectId).required(),
    human_category_id: Joi.string().custom(objectId).required(),
    venue_id: Joi.string().custom(objectId).required(),
    lang_id: Joi.string().custom(objectId).required(),
    release_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

const updateEventValidation = Joi.object({
    name: Joi.string().trim().min(2).max(200),
    photo: Joi.string().trim().uri(),
    start_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
    start_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
    finish_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
    finish_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
    info: Joi.string().trim().min(5),
    event_type_id: Joi.string().custom(objectId),
    human_category_id: Joi.string().custom(objectId),
    venue_id: Joi.string().custom(objectId),
    lang_id: Joi.string().custom(objectId),
    release_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)
}).min(1);

const idValidation = Joi.object({
    id: Joi.string().custom(objectId).required()
});

module.exports = {
    createEventValidation,
    updateEventValidation,
    idValidation
};