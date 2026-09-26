const { Router } = require("express");
const router = Router();

const {
    createVenueTypes,
    getVenueTypes,
    getVenueTypesById,
    updateVenueTypes,
    deleteVenueTypes
} = require("../controllers/venue_types.controller");

const {
    createVenueTypesValidationSchema,
    updateVenueTypesValidationSchema
} = require("../validation/venue_typesValidation");


// ================= VALIDATION MIDDLEWARE =================

const validateCreateVenueTypes = (req, res, next) => {
    const { error } = createVenueTypesValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

const validateUpdateVenueTypes = (req, res, next) => {
    const { error } = updateVenueTypesValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};


// ================= SWAGGER =================

/**
 * @swagger
 * tags:
 *   name: Venue Types
 *   description: Venue Types CRUD
 */

/**
 * @swagger
 * /venue-types:
 *   post:
 *     summary: Venue type yaratish
 *     tags: [Venue Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - venueId
 *               - typeId
 *             properties:
 *               venueId:
 *                 type: string
 *                 example: "66f1a2b3c4d5e6f7a8b9c0d1"
 *               typeId:
 *                 type: string
 *                 example: "66f1a2b3c4d5e6f7a8b9c0d2"
 *     responses:
 *       201:
 *         description: Venue type muvaffaqiyatli yaratildi
 *       400:
 *         description: Validation error
 */
router.post("/", validateCreateVenueTypes, createVenueTypes);


/**
 * @swagger
 * /venue-types:
 *   get:
 *     summary: Barcha venue typelarni olish
 *     tags: [Venue Types]
 *     responses:
 *       200:
 *         description: Barcha venue typelar ro'yxati
 */
router.get("/", getVenueTypes);


/**
 * @swagger
 * /venue-types/{id}:
 *   get:
 *     summary: ID orqali venue type olish
 *     tags: [Venue Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "66f1a2b3c4d5e6f7a8b9c0d3"
 *     responses:
 *       200:
 *         description: Venue type topildi
 *       404:
 *         description: Venue type topilmadi
 */
router.get("/:id", getVenueTypesById);


/**
 * @swagger
 * /venue-types/{id}:
 *   put:
 *     summary: Venue typeni yangilash
 *     tags: [Venue Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "66f1a2b3c4d5e6f7a8b9c0d3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: string
 *                 example: "66f1a2b3c4d5e6f7a8b9c0d1"
 *               typeId:
 *                 type: string
 *                 example: "66f1a2b3c4d5e6f7a8b9c0d2"
 *     responses:
 *       200:
 *         description: Venue type yangilandi
 *       404:
 *         description: Venue type topilmadi
 */
router.put("/:id", validateUpdateVenueTypes, updateVenueTypes);


/**
 * @swagger
 * /venue-types/{id}:
 *   delete:
 *     summary: Venue typeni o'chirish
 *     tags: [Venue Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "66f1a2b3c4d5e6f7a8b9c0d3"
 *     responses:
 *       200:
 *         description: Venue type o'chirildi
 *       404:
 *         description: Venue type topilmadi
 */
router.delete("/:id", deleteVenueTypes);


module.exports = router;