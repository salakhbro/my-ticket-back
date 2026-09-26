const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../model/adminSchema");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "super_refresh_secret";

// ----------------- Register Admin ---------------- //
const postRegisterAdmin = async (req, res) => {
    try {
        const { name, login, password, is_creator } = req.body;

        if (!name || !login || !password) {
            return res.status(400).json({
                success: false,
                message: "Barcha majburiy maydonlarni kiriting.",
            });
        }

        const existingAdmin = await Admin.findOne({ login });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Ushbu login allaqachon band qilingan.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            name,
            login,
            hashed_password: hashedPassword,
            is_creator: is_creator || false,
        });

        await newAdmin.save();

        return res.status(201).json({
            success: true,
            message: "Admin ro'yxatdan muvaffaqiyatli o'tdi.",
            innerData: {
                id: newAdmin._id,
                name: newAdmin.name,
                login: newAdmin.login,
                is_active: newAdmin.is_active,
                is_creator: newAdmin.is_creator,
            },
        });
    } catch (error) {
        console.error("Xato:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Adminni ro'yxatdan o'tkazishda xato yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Login Admin ---------------- //
const loginAdmin = async (req, res) => {
    try {
        const { login, password } = req.body;

        const admin = await Admin.findOne({ login });
        if (!admin || !admin.is_active) {
            return res.status(401).json({
                success: false,
                message: "Login yoki parol xato (yoki akkount faol emas).",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.hashed_password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Login yoki parol xato.",
            });
        }

        const accessToken = jwt.sign({ id: admin._id, login: admin.login }, JWT_SECRET, { expiresIn: "2h" });
        const refreshToken = jwt.sign({ id: admin._id }, REFRESH_SECRET, { expiresIn: "7d" });

        admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 10);
        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Muvaffaqiyatli avtorizatsiya.",
            tokens: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        console.error("Login xatosi:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Avtorizatsiyadan o'tishda xato yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Get All Admins ---------------- //
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, "-hashed_password -hashed_refresh_token");

        return res.status(200).json({
            success: true,
            message: "Barcha adminlar ro'yxati olingan.",
            innerData: admins,
        });
    } catch (error) {
        console.error("Error fetching admins:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Adminlarni olishda xato yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Get Admin By ID ---------------- //
const getAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById(adminId, "-hashed_password -hashed_refresh_token");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin topilmadi.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin topildi.",
            innerData: admin,
        });
    } catch (error) {
        console.error("GET ADMIN BY ID ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Adminni olishda xatolik yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Update Admin ---------------- //
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, is_active, is_creator } = req.body;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { name, is_active, is_creator },
            { new: true, runValidators: true }
        ).select("-hashed_password -hashed_refresh_token");

        if (!updatedAdmin) {
            return res.status(404).json({
                success: false,
                message: "Admin topilmadi.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin ma'lumotlari yangilandi.",
            innerData: updatedAdmin,
        });
    } catch (error) {
        console.error("Error updating admin:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Admin ma'lumotlarini yangilashda xato yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Search Admin ---------------- //
const searchAdmin = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({
                success: false,
                message: "Qidiruv so'rovi noto'g'ri berildi.",
            });
        }

        const result = await Admin.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { login: { $regex: query, $options: "i" } },
            ],
        }).select("-hashed_password -hashed_refresh_token");

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Bunday admin topilmadi.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Qidiruv natijalari.",
            innerData: result,
        });
    } catch (error) {
        console.error("Error searching admin:", error);
        return res.status(500).json({
            success: false,
            message: "Server error: Failed to fetch admins",
            error: error.message,
        });
    }
};

// ----------------- Delete Admin ---------------- //
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({
                success: false,
                message: "Admin topilmadi.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin muvaffaqiyatli o'chirildi.",
            innerData: deletedAdmin,
        });
    } catch (error) {
        console.error("Error deleting admin:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Adminni o'chirishda xatolik yuz berdi.",
            error: error.message,
        });
    }
};

module.exports = {
    postRegisterAdmin,
    loginAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    searchAdmin,
    deleteAdmin,
};