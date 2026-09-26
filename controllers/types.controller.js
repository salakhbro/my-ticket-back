const { Type } = require("../model/typesSchema");

// ----------------- Create Type ---------------- //
const createType = async (req, res) => {
    try {
        const { name } = req.body;

        const existingType = await Type.findOne({ name });
        if (existingType) {
            return res.status(400).json({
                success: false,
                message: "Bunday tur (type) allaqachon mavjud"
            });
        }

        const newType = new Type({ name });
        await newType.save();

        return res.status(201).json({
            success: true,
            message: "Yangi tur muvaffaqiyatli yaratildi",
            data: newType
        });
    } catch (error) {
        console.error("CREATE TYPE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Tur yaratishda xatolik yuz berdi",
            error: error.message
        });
    }
};

// ----------------- Get All Types ---------------- //
const getTypes = async (req, res) => {
    try {
        const types = await Type.find({});

        return res.json({
            success: true,
            message: "Barcha turlar ro'yxati olindi",
            innerData: types
        });
    } catch (error) {
        console.error("GET TYPES ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Turlarni olishda xatolik yuz berdi",
            error: error.message
        });
    }
};

// ----------------- Get Type By ID ---------------- //
const getTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const type = await Type.findById(id);

        if (!type) {
            return res.status(404).json({
                success: false,
                message: "Tur topilmadi"
            });
        }

        return res.json({
            success: true,
            message: "Tur ma'lumoti topildi",
            data: type
        });
    } catch (error) {
        console.error("GET TYPE BY ID ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Turni olishda xatolik yuz berdi",
            error: error.message
        });
    }
};

// ----------------- Update Type ---------------- //
const updateType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedType = await Type.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedType) {
            return res.status(404).json({
                success: false,
                message: "Tur topilmadi"
            });
        }

        return res.json({
            success: true,
            message: "Tur ma'lumotlari yangilandi",
            data: updatedType
        });
    } catch (error) {
        console.error("UPDATE TYPE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Turni yangilashda xatolik yuz berdi",
            error: error.message
        });
    }
};

// ----------------- Search Type ---------------- //
const searchType = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({
                success: false,
                message: "Qidiruv so'rovi xato kiritildi"
            });
        }

        const result = await Type.find({
            name: { $regex: query, $options: "i" }
        });

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Bunday tur topilmadi"
            });
        }

        return res.json({
            success: true,
            message: "Qidiruv natijalari",
            data: result
        });
    } catch (error) {
        console.error("SEARCH TYPE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Qidiruvda xatolik yuz berdi",
            error: error.message
        });
    }
};

// ----------------- Delete Type ---------------- //
const deleteType = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedType = await Type.findByIdAndDelete(id);

        if (!deletedType) {
            return res.status(404).json({
                success: false,
                message: "Tur topilmadi"
            });
        }

        return res.json({
            success: true,
            message: "Tur muvaffaqiyatli o'chirildi",
            data: deletedType
        });
    } catch (error) {
        console.error("DELETE TYPE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Turni o'chirishda xatolik yuz berdi",
            error: error.message
        });
    }
};

module.exports = {
    createType,
    getTypes,
    getTypeById,
    updateType,
    searchType,
    deleteType
};