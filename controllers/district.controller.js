const { District } = require("../model/districtSchema");
const mongoose = require("mongoose");

const createDistrict = async (req, res) => {
    try {
        const district = await District.create(req.body);

        // Populate qilingan ma'lumotni olamiz
        const populatedDistrict = await District.findById(district._id).populate("regionId");

        res.status(201).json({
            success: true,
            message: "District created successfully",
            data: populatedDistrict // <--- Shu yerda populatedDistrict bo'lishi kerak
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getDistricts = async (req, res) => {
    try {
        // Bu yerda ham regionId populate qilindi
        const districts = await District.find().populate("regionId");

        res.status(200).json({
            success: true,
            data: districts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getDistrictById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid district ID"
            });
        }

        // Bu yerda ham regionId populate qilindi
        const district = await District.findById(id).populate("regionId");

        if (!district) {
            return res.status(404).json({
                success: false,
                message: "District not found"
            });
        }

        res.status(200).json({
            success: true,
            data: district
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateDistrict = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid district ID"
            });
        }

        // Yangilangandan keyin regionId populate qilindi
        const district = await District.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).populate("regionId");

        if (!district) {
            return res.status(404).json({
                success: false,
                message: "District not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "District updated successfully",
            data: district
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteDistrict = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid district ID"
            });
        }

        const district = await District.findByIdAndDelete(id);

        if (!district) {
            return res.status(404).json({
                success: false,
                message: "District not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "District deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createDistrict,
    getDistricts,
    getDistrictById,
    updateDistrict,
    deleteDistrict
};