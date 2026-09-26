const { Router } = require("express");
const venuePhotoRouter = Router();

const {
    createVenuePhoto,
    getVenuePhotos,
    getVenuePhotoById,
    updateVenuePhoto,
    searchVenuePhoto,
    deleteVenuePhoto,
} = require("../controllers/venue_photo.controller");

const {
    createVenuePhotoValidationSchema,
    updateVenuePhotoValidationSchema,
} = require("../validation/venue_photoValidation");

// ================= VALIDATION MIDDLEWARES =================
const validateCreate = (req, res, next) => {
    const { error } = createVenuePhotoValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

const validateUpdate = (req, res, next) => {
    const { error } = updateVenuePhotoValidationSchema.validate(req.body);
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
 *   name: VenuePhotos
 *   description: Venue rasmlarini boshqarish API
 */

/**
 * @swagger
 * /venue-photos/create:
 *   post:
 *     summary: Yangi venue rasmini qo'shish
 *     tags: [VenuePhotos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - venueId
 *               - url
 *             properties:
 *               venueId:
 *                 type: string
 *                 example: "65f123456789abcdef012345"
 *               url:
 *                 type: string
 *                 example: "https://example.com/images/humo-arena.jpg"
 *     responses:
 *       201:
 *         description: Rasm saqlandi
 *       400:
 *         description: Validation xatosi
 */
venuePhotoRouter.post("/create", validateCreate, createVenuePhoto);

/**
 * @swagger
 * /venue-photos/getphotos:
 *   get:
 *     summary: Barcha venue rasmlarini olish
 *     tags: [VenuePhotos]
 *     responses:
 *       200:
 *         description: Rasmlar ro'yxati
 */
venuePhotoRouter.get("/getphotos", getVenuePhotos);

/**
 * @swagger
 * /venue-photos/getphoto/{id}:
 *   get:
 *     summary: ID orqali rasm ma'lumotlarini olish
 *     tags: [VenuePhotos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rasm topildi
 *       404:
 *         description: Rasm topilmadi
 */
venuePhotoRouter.get("/getphoto/:id", getVenuePhotoById);

/**
 * @swagger
 * /venue-photos/searchphoto:
 *   get:
 *     summary: Rasmlarni URL bo'yicha qidirish
 *     tags: [VenuePhotos]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: humo-arena
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
venuePhotoRouter.get("/searchphoto", searchVenuePhoto);

/**
 * @swagger
 * /venue-photos/updatephoto/{id}:
 *   put:
 *     summary: Rasm ma'lumotlarini yangilash
 *     tags: [VenuePhotos]
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
 *               venueId:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rasm yangilandi
 *       404:
 *         description: Rasm topilmadi
 */
venuePhotoRouter.put("/updatephoto/:id", validateUpdate, updateVenuePhoto);

/**
 * @swagger
 * /venue-photos/deletephoto/{id}:
 *   delete:
 *     summary: Rasmni o'chirish
 *     tags: [VenuePhotos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rasm o'chirildi
 *       404:
 *         description: Rasm topilmadi
 */
venuePhotoRouter.delete("/deletephoto/:id", deleteVenuePhoto);

module.exports = venuePhotoRouter;