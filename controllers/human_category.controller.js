const HumanCategory = require("../model/human_categorySchema");

const createHumanCategory = async (req, res) => {
    try {
        const humanCategory = await HumanCategory.create(req.body);

        res.status(201).json({
            success: true,
            data: humanCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllHumanCategories = async (req, res) => {
    try {
        const data = await HumanCategory.find();

        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getHumanCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await HumanCategory.findById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Human category topilmadi",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateHumanCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await HumanCategory.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Human category topilmadi",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteHumanCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await HumanCategory.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Human category topilmadi",
            });
        }

        res.status(200).json({
            success: true,
            message: "Human category o'chirildi",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createHumanCategory,
    getAllHumanCategories,
    getHumanCategoryById,
    updateHumanCategory,
    deleteHumanCategory,
};