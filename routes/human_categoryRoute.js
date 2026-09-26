const express = require("express");
const router = express.Router();

const {
    createHumanCategory,
    getAllHumanCategories,
    getHumanCategoryById,
    updateHumanCategory,
    deleteHumanCategory,
} = require("../controllers/human_category.controller");

const {
    createHumanCategoryValidation,
    updateHumanCategoryValidation,
} = require("../validation/human_categoryValidation");

const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    next();
};

/**
 * @swagger
 * tags:
 *   name: Human Category
 *   description: Human Category management
 */

/**
 * @swagger
 * /human-category:
 *   post:
 *     summary: Create Human Category
 *     tags: [Human Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - start_age
 *               - finish_age
 *               - gender
 *             properties:
 *               name:
 *                 type: string
 *                 example: string
 *               start_age:
 *                 type: integer
 *                 example: 18
 *               finish_age:
 *                 type: integer
 *                 example: 60
 *               gender:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Human Category created successfully
 *       400:
 *         description: Validation error
 */
router.post(
    "/",
    validateSchema(createHumanCategoryValidation),
    createHumanCategory
);

/**
 * @swagger
 * /human-category:
 *   get:
 *     summary: Get all Human Categories
 *     tags: [Human Category]
 *     responses:
 *       200:
 *         description: List of Human Categories
 */
router.get("/", getAllHumanCategories);

/**
 * @swagger
 * /human-category/{id}:
 *   get:
 *     summary: Get Human Category by ID
 *     tags: [Human Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Human Category found
 *       404:
 *         description: Human Category not found
 */
router.get("/:id", getHumanCategoryById);

/**
 * @swagger
 * /human-category/{id}:
 *   patch:
 *     summary: Update Human Category
 *     tags: [Human Category]
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
 *                 example: string
 *               start_age:
 *                 type: integer
 *                 example: 18
 *               finish_age:
 *                 type: integer
 *                 example: 65
 *               gender:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Human Category updated successfully
 *       404:
 *         description: Human Category not found
 */
router.patch(
    "/:id",
    validateSchema(updateHumanCategoryValidation),
    updateHumanCategory
);

/**
 * @swagger
 * /human-category/{id}:
 *   delete:
 *     summary: Delete Human Category
 *     tags: [Human Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Human Category deleted successfully
 *       404:
 *         description: Human Category not found
 */
router.delete("/:id", deleteHumanCategory);

module.exports = router;