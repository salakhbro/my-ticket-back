const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../model/adminSchema"); 

const router = Router();

// Maxfiy kalitlar (amaliyotda .env faylida saqlanadi)
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "super_refresh_secret";

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Adminlarni boshqarish va autentifikatsiya yo'nalishlari
 */

/**
 * @swagger
 * /api/admin/register:
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
 *         description: Admin muvaffaqiyatli yaratildi
 *       400:
 *         description: Login band yoki ma'lumotlar yetarli emas
 *       500:
 *         description: Server xatosi
 */
router.post("/register", async (req, res) => {
    try {
        const { name, login, password, is_creator } = req.body;

        if (!name || !login || !password) {
            return res.status(400).json({ message: "Barcha maydonlarni toldiring" });
        }

        const existingAdmin = await Admin.findOne({ login });
        if (existingAdmin) {
            return res.status(400).json({ message: "Ushbu login band" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            name,
            login,
            hashed_password: hashedPassword,
            is_creator: is_creator || false,
        });

        await newAdmin.save();

        res.status(201).json({
            message: "Admin muvaffaqiyatli yaratildi",
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                login: newAdmin.login,
                is_active: newAdmin.is_active,
                is_creator: newAdmin.is_creator,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: error.message });
    }
});

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Tizimga kirish
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
 *         description: Muvaffaqiyatli kirildi
 *       401:
 *         description: Login yoki parol noto'g'ri
 *       500:
 *         description: Server xatosi
 */
router.post("/login", async (req, res) => {
    try {
        const { login, password } = req.body;

        const admin = await Admin.findOne({ login });
        if (!admin || !admin.is_active) {
            return res.status(401).json({ message: "Login yoki parol noto'g'ri (yoki admin faol emas)" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.hashed_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Login yoki parol noto'g'ri" });
        }

        const accessToken = jwt.sign({ id: admin._id, login: admin.login }, JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: admin._id }, REFRESH_SECRET, { expiresIn: "7d" });

        admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 10);
        await admin.save();

        res.status(200).json({
            message: "Tizimga kirildi",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: error.message });
    }
});

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Barcha adminlar ro'yxatini olish
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Adminlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/", async (req, res) => {
    try {
        const admins = await Admin.find({}, "-hashed_password -hashed_refresh_token");
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik", error: error.message });
    }
});

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: ID bo'yicha admin ma'lumotini olish
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
 *         description: Admin ma'lumoti
 *       404:
 *         description: Admin topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/:id", async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id, "-hashed_password -hashed_refresh_token");
        if (!admin) {
            return res.status(404).json({ message: "Admin topilmadi" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik", error: error.message });
    }
});

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Admin ma'lumotlarini yangilash
 *     tags: [Admin]
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
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli yangilandi
 *       404:
 *         description: Admin topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/:id", async (req, res) => {
    try {
        const { name, is_active, is_creator } = req.body;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            { name, is_active, is_creator },
            { new: true, runValidators: true }
        ).select("-hashed_password -hashed_refresh_token");

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin topilmadi" });
        }

        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik", error: error.message });
    }
});

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Adminni o'chirish
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin o'chirildi
 *       404:
 *         description: Admin topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin topilmadi" });
        }
        res.status(200).json({ message: "Admin o'chirildi" });
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik", error: error.message });
    }
});

module.exports = router;