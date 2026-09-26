const { Router } = require("express");

const carts = Router();

const {
    createCart,
    getCarts,
    getCartById,
    updateCart,
    deleteCart
} = require("../controllers/cart.controller");

const {
    createCartValidationSchema,
    updateCartValidationSchema
} = require("../validation/cartValidation");

// ================= VALIDATION =================

const validateCreate = (req, res, next) => {
    const { error } = createCartValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

const validateUpdate = (req, res, next) => {
    const { error } = updateCartValidationSchema.validate(req.body);

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
 *   name: Carts
 *   description: Savatchalarni boshqarish API
 */

/**
 * @swagger
 * /cart/createcart:
 *   post:
 *     summary: Yangi savatcha qo'shish
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - status_id
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: "64b8f1a2c3d4e5f6a7b8c9d0"
 *               status_id:
 *                 type: number
 *                 example: 1
 *               fineshedAt:
 *                 type: string
 *                 example: "2026-09-26T14:30:00.000Z"
 *     responses:
 *       201:
 *         description: Cart yaratildi
 *       400:
 *         description: Validation error
 */
carts.post("/createcart", validateCreate, createCart);

/**
 * @swagger
 * /cart/getcarts:
 *   get:
 *     summary: Barcha savatchalarni olish
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: Cartlar ro'yxati
 */
carts.get("/getcarts", getCarts);

/**
 * @swagger
 * /cart/getcart/{id}:
 *   get:
 *     summary: ID orqali cart olish
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart topildi
 *       404:
 *         description: Cart topilmadi
 */
carts.get("/getcart/:id", getCartById);

/**
 * @swagger
 * /cart/updatecart/{id}:
 *   put:
 *     summary: Cartni yangilash
 *     tags: [Carts]
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
 *               customer_id:
 *                 type: string
 *                 example: "64b8f1a2c3d4e5f6a7b8c9d0"
 *               status_id:
 *                 type: number
 *                 example: 2
 *               fineshedAt:
 *                 type: string
 *                 example: "2026-09-26T14:30:00.000Z"
 *     responses:
 *       200:
 *         description: Cart yangilandi
 *       404:
 *         description: Cart topilmadi
 */
carts.put("/updatecart/:id", validateUpdate, updateCart);

/**
 * @swagger
 * /cart/deletecart/{id}:
 *   delete:
 *     summary: Cartni o'chirish
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart o'chirildi
 *       404:
 *         description: Cart topilmadi
 */
carts.delete("/deletecart/:id", deleteCart);

// ================= EXPORT =================

module.exports = carts;