const { Router } = require("express");

const district = Router();

const {
    createDistrict,
    getDistricts,
    getDistrictById,
    updateDistrict,
    deleteDistrict
} = require("../controllers/district.controller");

const {
    createDistrictValidationSchema,
    updateDistrictValidationSchema
} = require("../validation/districtValidation");

// ================= VALIDATION =================

const validateCreateDistrict = (req, res, next) => {
    const { error } = createDistrictValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

const validateUpdateDistrict = (req, res, next) => {
    const { error } = updateDistrictValidationSchema.validate(req.body);

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
 *   name: District
 *   description: Districtlarni boshqarish API
 */

/**
 * @swagger
 * /district/create:
 *   post:
 *     summary: Yangi district qo'shish
 *     tags: [District]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - regionId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Chortoq"
 *               regionId:
 *                 type: string
 *                 example: "65f123456789abcdef123456"
 *     responses:
 *       201:
 *         description: District yaratildi
 *       400:
 *         description: Validation error
 */
district.post(
    "/create",
    validateCreateDistrict,
    createDistrict
);

/**
 * @swagger
 * /district/get:
 *   get:
 *     summary: Barcha districtlarni olish
 *     tags: [District]
 *     responses:
 *       200:
 *         description: Districtlar ro'yxati
 */
district.get("/get", getDistricts);

/**
 * @swagger
 * /district/get/{id}:
 *   get:
 *     summary: ID orqali district olish
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65f123456789abcdef123456"
 *     responses:
 *       200:
 *         description: District topildi
 *       404:
 *         description: District topilmadi
 */
district.get("/get/:id", getDistrictById);

/**
 * @swagger
 * /district/update/{id}:
 *   put:
 *     summary: Districtni yangilash
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65f123456789abcdef123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pop"
 *               regionId:
 *                 type: string
 *                 example: "65f123456789abcdef123456"
 *     responses:
 *       200:
 *         description: District yangilandi
 *       404:
 *         description: District topilmadi
 */
district.put(
    "/update/:id",
    validateUpdateDistrict,
    updateDistrict
);

/**
 * @swagger
 * /district/delete/{id}:
 *   delete:
 *     summary: Districtni o'chirish
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65f123456789abcdef123456"
 *     responses:
 *       200:
 *         description: District o'chirildi
 *       404:
 *         description: District topilmadi
 */
district.delete(
    "/delete/:id",
    deleteDistrict
);

module.exports = district;