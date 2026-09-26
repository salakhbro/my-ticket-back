const { Router } = require("express");

const router = Router();

const {
    createRegion,
    getRegions,
    getRegionById,
    updateRegion,
    deleteRegion
} = require("../controllers/region.controller");

const {
    createRegionValidationSchema,
    updateRegionValidationSchema
} = require("../validation/regionValidation");

// ================= VALIDATION =================

const validateCreateRegion = (req, res, next) => {
    const { error } = createRegionValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

const validateUpdateRegion = (req, res, next) => {
    const { error } = updateRegionValidationSchema.validate(req.body);

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
 *   name: Region
 *   description: Regionlarni boshqarish API
 */

/**
 * @swagger
 * /region/create:
 *   post:
 *     summary: Yangi region qo'shish
 *     tags: [Region]
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
 *                 example: "Namangan"
 *     responses:
 *       201:
 *         description: Region yaratildi
 *       400:
 *         description: Validation error
 */
router.post("/create", validateCreateRegion, createRegion);

/**
 * @swagger
 * /region/get:
 *   get:
 *     summary: Barcha regionlarni olish
 *     tags: [Region]
 *     responses:
 *       200:
 *         description: Regionlar ro'yxati
 */
router.get("/get", getRegions);

/**
 * @swagger
 * /region/get/{id}:
 *   get:
 *     summary: ID orqali region olish
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: ""
 *     responses:
 *       200:
 *         description: Region topildi
 *       404:
 *         description: Region topilmadi
 */
router.get("/get/:id", getRegionById);

/**
 * @swagger
 * /region/update/{id}:
 *   put:
 *     summary: Regionni yangilash
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: ""
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
 *                 example: ""
 *     responses:
 *       200:
 *         description: Region yangilandi
 *       404:
 *         description: Region topilmadi
 */
router.put("/update/:id", validateUpdateRegion, updateRegion);

/**
 * @swagger
 * /region/delete/{id}:
 *   delete:
 *     summary: Regionni o'chirish
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: ""
 *     responses:
 *       200:
 *         description: Region o'chirildi
 *       404:
 *         description: Region topilmadi
 */
router.delete("/delete/:id", deleteRegion);

module.exports = router;