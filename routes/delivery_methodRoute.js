const { Router } = require("express");

const router = Router();

const {
    createDeliveryMethod,
    getDeliveryMethods,
    getDeliveryMethodById,
    updateDeliveryMethod,
    deleteDeliveryMethod
} = require("../controllers/delivery_method.controller");

/**
 * @swagger
 * tags:
 *   name: Delivery Method
 *   description: Yetkazib berish usullarini boshqarish
 */

/**
 * @swagger
 * /api/delivery-method:
 *   post:
 *     summary: Yangi delivery method yaratish
 *     tags: [Delivery Method]
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
 *                 example: Express Delivery
 *     responses:
 *       201:
 *         description: Delivery method yaratildi
 */
router.post("/", createDeliveryMethod);

/**
 * @swagger
 * /api/delivery-method:
 *   get:
 *     summary: Barcha delivery methodlarni olish
 *     tags: [Delivery Method]
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 */
router.get("/", getDeliveryMethods);

/**
 * @swagger
 * /api/delivery-method/{id}:
 *   get:
 *     summary: ID orqali delivery methodni olish
 *     tags: [Delivery Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       404:
 *         description: Delivery method topilmadi
 */
router.get("/:id", getDeliveryMethodById);

/**
 * @swagger
 * /api/delivery-method/{id}:
 *   put:
 *     summary: Delivery methodni yangilash
 *     tags: [Delivery Method]
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
 *                 example: Standard Delivery
 *     responses:
 *       200:
 *         description: Delivery method yangilandi
 *       404:
 *         description: Delivery method topilmadi
 */
router.put("/:id", updateDeliveryMethod);

/**
 * @swagger
 * /api/delivery-method/{id}:
 *   delete:
 *     summary: Delivery methodni o'chirish
 *     tags: [Delivery Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delivery method o'chirildi
 *       404:
 *         description: Delivery method topilmadi
 */
router.delete("/:id", deleteDeliveryMethod);

module.exports = router;