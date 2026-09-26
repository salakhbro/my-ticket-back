const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/Admin");

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "default_refresh_secret";

// Yangi admin qo'shish
const createAdmin = async (req, res) => {
    try {
        const { name, login, password, is_creator } = req.body;

        if (!name || !login || !password) {
            return res.status(400).json({ message: "Barcha majburiy maydonlarni kiriting" });
        }

        const checkAdmin = await Admin.findOne({ login });  
        if (checkAdmin) {
            return res.status(400).json({ message: "Ushbu login allaqachon mavjud" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            name,
            login,
            hashed_password: hashedPassword,
            is_creator: is_creator || false,
        });

        res.status(201).json({
            message: "Admin ro'yxatga olindi",
            data: {
                id: newAdmin._id,
                name: newAdmin.name,
                login: newAdmin.login,
                is_active: newAdmin.is_active,
                is_creator: newAdmin.is_creator,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Ichki server xatoligi", details: error.message });
    }
};

// Tizimga kirish (Login)
const loginAdmin = async (req, res) => {
    try {
        const { login, password } = req.body;

        const admin = await Admin.findOne({ login });
        if (!admin || !admin.is_active) {
            return res.status(401).json({ message: "Login yoki parol xato (yoki akkount faol emas)" });
        }

        const isMatch = await bcrypt.compare(password, admin.hashed_password);
        if (!isMatch) {
            return res.status(401).json({ message: "Login yoki parol xato" });
        }

        const accessToken = jwt.sign({ id: admin._id, login: admin.login }, JWT_SECRET, { expiresIn: "2h" });
        const refreshToken = jwt.sign({ id: admin._id }, REFRESH_SECRET, { expiresIn: "7d" });

        admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 10);
        await admin.save();

        res.status(200).json({
            message: "Muvaffaqiyatli avtorizatsiya",
            tokens: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Ichki server xatoligi", details: error.message });
    }
};

// Barcha adminlarni olish
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, "-hashed_password -hashed_refresh_token");
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", details: error.message });
    }
};

// ID bo'yicha bitta adminni olish
const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id, "-hashed_password -hashed_refresh_token");

        if (!admin) {
            return res.status(404).json({ message: "Admin topilmadi" });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", details: error.message });
    }
};

// Admin ma'lumotlarini tahrirlash
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, is_active, is_creator } = req.body;

        const updated = await Admin.findByIdAndUpdate(
            id,
            { name, is_active, is_creator },
            { new: true, runValidators: true }
        ).select("-hashed_password -hashed_refresh_token");

        if (!updated) {
            return res.status(404).json({ message: "Admin topilmadi" });
        }

        res.status(200).json({ message: "Ma'lumotlar yangilandi", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", details: error.message });
    }
};

// Adminni o'chirish
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Admin.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Admin topilmadi" });
        }

        res.status(200).json({ message: "Admin tizimdan o'chirildi" });
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", details: error.message });
    }
};

module.exports = {
    createAdmin,
    loginAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
};