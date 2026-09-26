const { Router } = require("express");
const cartItems = Router();

const {
    createCartItem,
    getCartItems,
    getCartItemById,
    updateCartItem,
    deleteCartItem
} = require("../controllers/cart_item.controller");

const {
    createCartItemSchema,
    updateCartItemSchema
} = require("../validation/cart_itemValidation");

// Validation middleware
const validateCreate = (req, res, next) => {
    const { error } = createCartItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

const validateUpdate = (req, res, next) => {
    const { error } = updateCartItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

/**
 * @swagger
 * tags:
 *   name: CartItems
 *   description: Savat elementlarini boshqarish API
 */

/**
 * @swagger
 * /cart-items/add:
 *   post:
 *     summary: Yangi cart item qo'shish
 *     tags: [CartItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticket_id
 *               - cart_id
 *             properties:
 *               ticket_id:
 *                 type: string
 *                 example: "65f2a1b3c8e4d2a1b3c8e4d2"
 *               cart_id:
 *                 type: string
 *                 example: "65f2a1b3c8e4d2a1b3c8e4d1"
 *     responses:
 *       201:
 *         description: Cart item yaratildi
 *       400:
 *         description: Validation error
 */
cartItems.post("/add", validateCreate, createCartItem);

/**
 * @swagger
 * /cart-items/getall:
 *   get:
 *     summary: Barcha cart itemlarni olish
 *     tags: [CartItems]
 *     responses:
 *       200:
 *         description: Cart itemlar ro'yxati
 */
cartItems.get("/getall", getCartItems);

/**
 * @swagger
 * /cart-items/get/{id}:
 *   get:
 *     summary: ID orqali cart item olish
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item topildi
 *       404:
 *         description: Cart item topilmadi
 */
cartItems.get("/get/:id", getCartItemById);

/**
 * @swagger
 * /cart-items/update/{id}:
 *   put:
 *     summary: Cart itemni yangilash
 *     tags: [CartItems]
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
 *               ticket_id:
 *                 type: string
 *                 example: "65f2a1b3c8e4d2a1b3c8e4d2"
 *               cart_id:
 *                 type: string
 *                 example: "65f2a1b3c8e4d2a1b3c8e4d1"
 *     responses:
 *       200:
 *         description: Cart item yangilandi
 *       404:
 *         description: Cart item topilmadi
 */
cartItems.put("/update/:id", validateUpdate, updateCartItem);

/**
 * @swagger
 * /cart-items/delete/{id}:
 *   delete:
 *     summary: Cart itemni o'chirish
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item o'chirildi
 *       404:
 *         description: Cart item topilmadi
 */
cartItems.delete("/delete/:id", deleteCartItem);

module.exports = cartItems;