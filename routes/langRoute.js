const { Router } = require("express");

const router = Router();

const {
    createLang,
    getAllLangs,
    getLangById,
    updateLang,
    deleteLang,
} = require("../controllers/lang.controller");

/**
 * @swagger
 * tags:
 *   name: Lang
 *   description: Tillarni boshqarish
 */

/**
 * @swagger
 * /lang:
 *   post:
 *     summary: Yangi til yaratish
 *     tags: [Lang]
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
 *                 example: English
 *     responses:
 *       201:
 *         description: Til muvaffaqiyatli yaratildi
 *       400:
 *         description: Xato ma'lumot
 *       500:
 *         description: Server xatosi
 *
 *   get:
 *     summary: Barcha tillarni olish
 *     tags: [Lang]
 *     responses:
 *       200:
 *         description: Tillar ro'yxati
 *       500:
 *         description: Server xatosi
 */

router
    .route("/")
    .post(createLang)
    .get(getAllLangs);

/**
 * @swagger
 * /lang/{id}:
 *   get:
 *     summary: ID orqali bitta tilni olish
 *     tags: [Lang]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: 6aad170c3433c1d89c41b1d4
 *     responses:
 *       200:
 *         description: Til topildi
 *       404:
 *         description: Til topilmadi
 *       500:
 *         description: Server xatosi
 *
 *   put:
 *     summary: Tilni yangilash
 *     tags: [Lang]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: 6aad170c3433c1d89c41b1d4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: English
 *     responses:
 *       200:
 *         description: Til muvaffaqiyatli yangilandi
 *       404:
 *         description: Til topilmadi
 *       500:
 *         description: Server xatosi
 *
 *   delete:
 *     summary: Tilni o'chirish
 *     tags: [Lang]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: 6aad170c3433c1d89c41b1d4
 *     responses:
 *       200:
 *         description: Til muvaffaqiyatli o'chirildi
 *       404:
 *         description: Til topilmadi
 *       500:
 *         description: Server xatosi
 */

router
    .route("/:id")
    .get(getLangById)
    .put(updateLang)
    .delete(deleteLang);

module.exports = router;