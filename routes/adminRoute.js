const { Router } = require("express");
const router = Router();

const {
    postRegisterAdmin, 
    loginAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
} = require("../controllers/admin.controller");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Adminlarni boshqarish va autentifikatsiya yo'nalishlari
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Yangi admin ro'yxatdan o'tkazish
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - login
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ali Valiyev"
 *               login:
 *                 type: string
 *                 example: "admin_ali"
 *               password:
 *                 type: string
 *                 example: "Pass1234!"
 *               is_creator:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Admin ro'yxatga olindi
 *       400:
 *         description: Barcha majburiy maydonlarni kiriting yoki login band
 *       500:
 *         description: Ichki server xatoligi
 */
router.post("/register", postRegisterAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Tizimga kirish (Login)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 example: "admin_ali"
 *               password:
 *                 type: string
 *                 example: "Pass1234!"
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli avtorizatsiya
 *       401:
 *         description: Login yoki parol xato (yoki akkount faol emas)
 *       500:
 *         description: Ichki server xatoligi
 */
router.post("/login", loginAdmin);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Barcha adminlarni olish
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Adminlar ro'yxati muvaffaqiyatli olindi
 *       500:
 *         description: Serverda xatolik yuz berdi
 */
router.get("/", getAdmins);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: ID bo'yicha bitta adminni olish
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID si
 *     responses:
 *       200:
 *         description: Admin ma'lumotlari topildi
 *       404:
 *         description: Admin topilmadi
 *       500:
 *         description: Serverda xatolik yuz berdi
 */
router.get("/:id", getAdminById);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Admin ma'lumotlarini tahrirlash
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ali Valiyev"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               is_creator:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Ma'lumotlar yangilandi
 *       404:
 *         description: Admin topilmadi
 *       500:
 *         description: Serverda xatolik yuz berdi
 */
router.put("/:id", updateAdmin);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Adminni o'chirish
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID si
 *     responses:
 *       200:
 *         description: Admin tizimdan o'chirildi
 *       404:
 *         description: Admin topilmadi
 *       500:
 *         description: Serverda xatolik yuz berdi
 */
router.delete("/:id", deleteAdmin);

module.exports = router;