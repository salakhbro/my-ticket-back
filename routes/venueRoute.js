const { Router } = require("express");
const venueRouter = Router();

const {
    createVenue,
    getVenues,
    getVenueById,
    updateVenue,
    searchVenue,
    deleteVenue,
} = require("../controllers/venue.controller");

const {
    createVenueValidationSchema,
    updateVenueValidationSchema,
} = require("../validation/venueValidation");

// ================= VALIDATION MIDDLEWARES =================
const validateCreate = (req, res, next) => {
    const { error } = createVenueValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

const validateUpdate = (req, res, next) => {
    const { error } = updateVenueValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

// ================= SWAGGER DOCUMENTATION =================

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Joy va inshootlarni (Venue) boshqarish API
 */

/**
 * @swagger
 * /venues/create:
 *   post:
 *     summary: Yangi venue qo'shish
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *               - regionId
 *               - districtId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Humo Arena"
 *               address:
 *                 type: string
 *                 example: "Toshkent sh., Beshagach ko'chasi, 1"
 *               location:
 *                 type: string
 *                 example: "41.311151, 69.240562"
 *               site:
 *                 type: string
 *                 example: "https://humoarena.uz"
 *               phone:
 *                 type: string
 *                 example: "+998712000000"
 *               schema:
 *                 type: string
 *                 example: "MULTIPOLYGON(((30 20, 45 40, 10 40, 30 20)))"
 *               regionId:
 *                 type: string
 *                 example: "6ab41f4b653c9d8e82a5e0b0"
 *               districtId:
 *                 type: string
 *                 example: "56ab423580037dc038d6f8a5"
 *     responses:
 *       201:
 *         description: Venue yaratildi
 *       400:
 *         description: Validation xatosi
 */
venueRouter.post("/create", validateCreate, createVenue);

/**
 * @swagger
 * /venues/getvenues:
 *   get:
 *     summary: Barcha venuelarni olish
 *     tags: [Venues]
 *     responses:
 *       200:
 *         description: Venuelar ro'yxati
 */
venueRouter.get("/getvenues", getVenues);

/**
 * @swagger
 * /venues/getvenue/{id}:
 *   get:
 *     summary: ID orqali venue olish
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue topildi
 *       404:
 *         description: Venue topilmadi
 */
venueRouter.get("/getvenue/:id", getVenueById);

/**
 * @swagger
 * /venues/searchvenue:
 *   get:
 *     summary: Venue qidirish
 *     tags: [Venues]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: Humo
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
venueRouter.get("/searchvenue", searchVenue);

/**
 * @swagger
 * /venues/updatevenue/{id}:
 *   put:
 *     summary: Venueni yangilash
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               regionId:
 *                 type: string
 *               districtId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Venue yangilandi
 *       404:
 *         description: Venue topilmadi
 */
venueRouter.put("/updatevenue/:id", validateUpdate, updateVenue);

/**
 * @swagger
 * /venues/deletevenue/{id}:
 *   delete:
 *     summary: Venueni o'chirish
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue o'chirildi
 *       404:
 *         description: Venue topilmadi
 */
venueRouter.delete("/deletevenue/:id", deleteVenue);

module.exports = venueRouter;