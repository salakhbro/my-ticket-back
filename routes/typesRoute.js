const { Router } = require("express");

const types = Router();

const {
    createType,
    getTypes,
    getTypeById,
    updateType,
    searchType,
    deleteType
} = require("../controllers/types.controller");

const {
    createTypeValidationSchema,
    updateTypeValidationSchema
} = require("../validation/typesValidation");

// ================= VALIDATION MIDDLEWARES =================

const validateCreate = (req, res, next) => {
    const { error } = createTypeValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

const validateUpdate = (req, res, next) => {
    const { error } = updateTypeValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

// ================= SWAGGER DOCUMENTATION =================

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Turlarni boshqarish API
 */

/**
 * @swagger
 * /types/create:
 *   post:
 *     summary: Yangi tur yaratish
 *     tags: [Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Tur muvaffaqiyatli yaratildi
 *       400:
 *         description: Validation yoki mavjudlik xatosi
 */
types.post("/create", validateCreate, createType);

/**
 * @swagger
 * /types/getall:
 *   get:
 *     summary: Barcha turlarni olish
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: Turlar ro'yxati
 */
types.get("/getall", getTypes);

/**
 * @swagger
 * /types/search:
 *   get:
 *     summary: Tur nomiga ko'ra qidirish
 *     tags: [Types]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: Elec
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 *       404:
 *         description: Topilmadi
 */
types.get("/search", searchType);

/**
 * @swagger
 * /types/get/{id}:
 *   get:
 *     summary: ID orqali turni olish
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tur topildi
 *       404:
 *         description: Tur topilmadi
 */
types.get("/get/:id", getTypeById);

/**
 * @swagger
 * /types/update/{id}:
 *   put:
 *     summary: Turni yangilash
 *     tags: [Types]
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
 *                 example: "Gadgets"
 *     responses:
 *       200:
 *         description: Tur yangilandi
 *       404:
 *         description: Tur topilmadi
 */
types.put("/update/:id", validateUpdate, updateType);

/**
 * @swagger
 * /types/delete/{id}:
 *   delete:
 *     summary: Turni o'chirish
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tur o'chirildi
 *       404:
 *         description: Tur topilmadi
 */
types.delete("/delete/:id", deleteType);
    
// ================= EXPORT =================

module.exports = types;