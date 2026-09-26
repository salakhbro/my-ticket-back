const express = require("express");
const router = express.Router();

const seatTypeController = require("../controllers/seat_type.controller");

/**
 * @swagger
 * tags:
 *   name: SeatType
 *   description: Seat type CRUD
 */

/**
 * @swagger
 * /seat-type:
 *   post:
 *     summary: Yangi joy turini yaratish
 *     tags: [SeatType]
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
 *                 example: VIP
 *     responses:
 *       201:
 *         description: Joy turi muvaffaqiyatli yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *
 *   get:
 *     summary: Barcha joy turlarini olish
 *     tags: [SeatType]
 *     responses:
 *       200:
 *         description: Joy turlari ro'yxati
 */

router.post("/", seatTypeController.createSeatType);
router.get("/", seatTypeController.getAllSeatTypes);


/**
 * @swagger
 * /seat-type/{id}:
 *   get:
 *     summary: ID bo'yicha joy turini olish
 *     tags: [SeatType]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joy turi topildi
 *       404:
 *         description: Joy turi topilmadi
 *
 *   put:
 *     summary: ID bo'yicha joy turini yangilash
 *     tags: [SeatType]
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
 *                 example: Premium
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: Joy turi topilmadi
 *
 *   delete:
 *     summary: ID bo'yicha joy turini o'chirish
 *     tags: [SeatType]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli o'chirildi
 *       404:
 *         description: Joy turi topilmadi
 */

router.get("/:id", seatTypeController.getSeatTypeById);
router.put("/:id", seatTypeController.updateSeatType);
router.delete("/:id", seatTypeController.deleteSeatType);

module.exports = router;