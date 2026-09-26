const { Region } = require("../model/regionSchema");

// ================= CREATE REGION =================

const createRegion = async (req, res) => {
    try {
        const { name } = req.body;

        const existingRegion = await Region.findOne({ name });

        if (existingRegion) {
            return res.status(400).json({
                success: false,
                message: "Bu region mavjud"
            });
        }

        const region = await Region.create({
            name
        });

        res.status(201).json({
            success: true,
            message: "Region created successfully",
            region
        });

    } catch (error) {
        console.error("Error creating region:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// ================= GET REGIONS =================

const getRegions = async (req, res) => {
    try {
        const regions = await Region.find({});

        res.json({
            success: true,
            message: "All regions",
            regions
        });

    } catch (error) {
        console.error("Error fetching regions:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// ================= GET REGION BY ID =================

const getRegionById = async (req, res) => {
    try {
        const { id } = req.params;

        const region = await Region.findById(id);

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found"
            });
        }

        res.json({
            success: true,
            message: "Region found",
            region
        });

    } catch (error) {
        console.error("Error fetching region:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// ================= UPDATE REGION =================

const updateRegion = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const region = await Region.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found"
            });
        }

        res.json({
            success: true,
            message: "Region updated successfully",
            region
        });

    } catch (error) {
        console.error("Error updating region:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// ================= DELETE REGION =================

const deleteRegion = async (req, res) => {
    try {
        const { id } = req.params;

        const region = await Region.findByIdAndDelete(id);

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Region not found"
            });
        }

        res.json({
            success: true,
            message: "Region deleted successfully",
            region
        });

    } catch (error) {
        console.error("Error deleting region:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createRegion,
    getRegions,
    getRegionById,
    updateRegion,
    deleteRegion
};