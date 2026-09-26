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
 * /payment-method:
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
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", createPaymentMethod);

/**
 * @swagger
 * /payment-method:
 *   get:
 *     summary: Get all payment methods
 *     tags: [Payment Method]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get("/", getPaymentMethods);

/**
 * @swagger
 * /payment-method/{id}:
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
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getPaymentMethodById);

/**
 * @swagger
 * /payment-method/{id}:
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
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updatePaymentMethod);

/**
 * @swagger
 * /payment-method/{id}:
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
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deletePaymentMethod);

module.exports = router;