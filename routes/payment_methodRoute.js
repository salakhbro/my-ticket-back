const { Router } = require("express");

const router = Router();

const {
    createPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod
} = require("../controllers/payment_method.controller");

/**
 * @swagger
 * tags:
 *   name: Payment Method
 *   description: Payment method CRUD
 */

/**
 * @swagger
 * /api/payment-method:
 *   post:
 *     summary: Create payment method
 *     tags: [Payment Method]
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
 *                 example: Humo Card
 *     responses:
 *       201:
 *         description: Payment method created
 */
router.post("/", createPaymentMethod);

/**
 * @swagger
 * /api/payment-method:
 *   get:
 *     summary: Get all payment methods
 *     tags: [Payment Method]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getPaymentMethods);

/**
 * @swagger
 * /api/payment-method/{id}:
 *   get:
 *     summary: Get payment method by ID
 *     tags: [Payment Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Payment method not found
 */
router.get("/:id", getPaymentMethodById);

/**
 * @swagger
 * /api/payment-method/{id}:
 *   put:
 *     summary: Update payment method
 *     tags: [Payment Method]
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
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Humo Card
 *     responses:
 *       200:
 *         description: Payment method updated
 *       404:
 *         description: Payment method not found
 */
router.put("/:id", updatePaymentMethod);

/**
 * @swagger
 * /api/payment-method/{id}:
 *   delete:
 *     summary: Delete payment method
 *     tags: [Payment Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment method deleted
 *       404:
 *         description: Payment method not found
 */
router.delete("/:id", deletePaymentMethod);

module.exports = router;