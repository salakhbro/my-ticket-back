const VenueTypes = require("../model/venue_typesSchema");

const createVenueTypes = async (req, res) => {
    try {
        const { venueId, typeId } = req.body;
        const newVenueType = await VenueTypes.create({ venueId, typeId });

        return res.status(201).json({
            success: true,
            data: newVenueType
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Venue type yaratishda xatolik",
            error: error.message
        });
    }
};

const getVenueTypes = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.find({})
            .populate("venueId")
            .populate("typeId");

        res.status(200).json({
            success: true,
            data: venueTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Venue typelarni olishda xatolik",
            error: error.message
        });
    }
};

const getVenueTypesById = async (req, res) => {
    try {
        const { id } = req.params;
        const venueType = await VenueTypes.findById(id)
            .populate("venueId")
            .populate("typeId");

        if (!venueType) {
            return res.status(404).json({
                success: false,
                message: "Venue type topilmadi"
            });
        }

        res.status(200).json({
            success: true,
            data: venueType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Venue type olishda xatolik",
            error: error.message
        });
    }
};

const updateVenueTypes = async (req, res) => {
    try {
        const { id } = req.params;
        const { venueId, typeId } = req.body;

        const updateData = {};
        if (venueId !== undefined) updateData.venueId = venueId;
        if (typeId !== undefined) updateData.typeId = typeId;

        const updatedVenueType = await VenueTypes.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("venueId").populate("typeId");

        if (!updatedVenueType) {
            return res.status(404).json({
                success: false,
                message: "Venue type topilmadi"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedVenueType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Venue type yangilashda xatolik",
            error: error.message
        });
    }
};

const deleteVenueTypes = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVenueType = await VenueTypes.findByIdAndDelete(id);

        if (!deletedVenueType) {
            return res.status(404).json({
                success: false,
                message: "Venue type topilmadi"
            });
        }

        res.status(200).json({
            success: true,
            data: deletedVenueType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Venue type o'chirishda xatolik",
            error: error.message
        });
    }
};

module.exports = {
    createVenueTypes,
    getVenueTypes,
    getVenueTypesById,
    updateVenueTypes,
    deleteVenueTypes
};