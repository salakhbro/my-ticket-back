const Joi = require("joi");

// ================= CREATE VALIDATION =================
const createVenuePhotoValidationSchema = Joi.object({
    venueId: Joi.string().hex().length(24).required(),
    url: Joi.string().trim().required(),
});

// ================= UPDATE VALIDATION =================
const updateVenuePhotoValidationSchema = Joi.object({
    venueId: Joi.string().hex().length(24).optional(),
    url: Joi.string().trim().optional(),
});

module.exports = {
    createVenuePhotoValidationSchema,
    updateVenuePhotoValidationSchema,
};