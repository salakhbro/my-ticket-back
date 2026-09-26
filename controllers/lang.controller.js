const { Lang } = require("../model/langSchema");

// CREATE
const createLang = async (req, res) => {
    try {
        const { name } = req.body;

        const lang = await Lang.create({
            name,
        });

        res.status(201).json({
            success: true,
            message: "Lang created successfully",
            data: lang,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL
const getAllLangs = async (req, res) => {
    try {
        const langs = await Lang.find();

        res.status(200).json({
            success: true,
            count: langs.length,
            data: langs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET BY ID
const getLangById = async (req, res) => {
    try {
        const lang = await Lang.findById(req.params.id);

        if (!lang) {
            return res.status(404).json({
                success: false,
                message: "Lang not found",
            });
        }

        res.status(200).json({
            success: true,
            data: lang,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE
const updateLang = async (req, res) => {
    try {
        const lang = await Lang.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!lang) {
            return res.status(404).json({
                success: false,
                message: "Lang not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Lang updated successfully",
            data: lang,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE
const deleteLang = async (req, res) => {
    try {
        const lang = await Lang.findByIdAndDelete(req.params.id);

        if (!lang) {
            return res.status(404).json({
                success: false,
                message: "Lang not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Lang deleted successfully",
            data: lang,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createLang,
    getAllLangs,
    getLangById,
    updateLang,
    deleteLang,
};