const Joi = require("joi");

const objectId = Joi.string().hex().length(24);

const createVenueTypesValidationSchema = Joi.object({
    venueId: objectId.required().messages({
        "string.hex": "venueId noto'g'ri ID formatida",
        "string.length": "venueId noto'g'ri ID formatida",
        "any.required": "venueId majburiy"
    }),
    typeId: objectId.required().messages({
        "string.hex": "typeId noto'g'ri ID formatida",
        "string.length": "typeId noto'g'ri ID formatida",
        "any.required": "typeId majburiy"
    })
});

const updateVenueTypesValidationSchema = Joi.object({
    venueId: objectId.optional(),
    typeId: objectId.optional()
}).min(1).messages({
    "object.min": "Kamida bitta maydon yuborilishi kerak"
});

module.exports = {
    createVenueTypesValidationSchema,
    updateVenueTypesValidationSchema
};