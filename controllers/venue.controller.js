const { Venue } = require("../model/venueSchema");

// ----------------- Create Venue -----------------
const createVenue = async (req, res) => {
    try {
        const {
            name,
            address,
            location,
            site,
            phone,
            schema,
            regionId,
            districtId,
        } = req.body;

        const existingVenue = await Venue.findOne({ name, phone });
        if (existingVenue) {
            return res.status(400).json({
                success: false,
                message: "Ushbu nom va telefon raqami bilan venue mavjud.",
            });
        }

        const newVenue = new Venue({
            name,
            address,
            location: location || "",
            site: site || "",
            phone,
            schema: schema || "",
            regionId,
            districtId,
        });

        await newVenue.save();

        return res.status(201).json({
            success: true,
            message: "Venue muvaffaqiyatli yaratildi.",
            data: newVenue,
        });
    } catch (error) {
        console.error("Create Venue Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Venue yaratishda xato yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Get All Venues (Populate bilan) -----------------
const getVenues = async (req, res) => {
    try {
        const venues = await Venue.find({})
            .populate("regionId")
            .populate("districtId");

        res.json({
            success: true,
            message: "Barcha venuelar ro'yxati olingan.",
            innerData: venues,
        });
    } catch (error) {
        console.error("Get Venues Error:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Venuelarni olishda xato yuz berdi.",
        });
    }
};

// ----------------- Get Venue By ID (Populate bilan) -----------------
const getVenueById = async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await Venue.findById(id)
            .populate("regionId")
            .populate("districtId");

        if (!venue) {
            return res.status(404).json({
                success: false,
                message: "Venue topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Venue topildi",
            venue,
        });
    } catch (error) {
        console.error("GET VENUE BY ID ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ----------------- Update Venue -----------------
const updateVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            address,
            location,
            site,
            phone,
            schema,
            regionId,
            districtId,
        } = req.body;

        const updateData = {
            name,
            address,
            location,
            site,
            phone,
            schema,
            regionId,
            districtId,
        };

        const updatedVenue = await Venue.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
            .populate("regionId")
            .populate("districtId");

        if (!updatedVenue) {
            return res.status(404).json({
                success: false,
                message: "Venue topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Venue ma'lumotlari yangilandi",
            venue: updatedVenue,
        });
    } catch (error) {
        console.error("Error updating venue:", error.message);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Venue ma'lumotlarini yangilashda xato yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Search Venue -----------------
const searchVenue = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Qidiruv so'rovi noto'g'ri" });
        }

        const result = await Venue.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { address: { $regex: query, $options: "i" } },
                { site: { $regex: query, $options: "i" } },
            ],
        })
            .populate("regionId")
            .populate("districtId");

        if (result.length === 0) {
            return res.status(404).json({ message: "Bunday venue topilmadi" });
        }

        res.json({ message: "Qidiruv natijalari", venues: result });
    } catch (error) {
        console.error("Error searching venues:", error);
        res.status(500).json({ message: "Server error: Failed to search venues" });
    }
};

// ----------------- Delete Venue -----------------
const deleteVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVenue = await Venue.findByIdAndDelete(id);

        if (!deletedVenue) {
            return res.status(404).json({
                success: false,
                message: "Venue topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Venue muvaffaqiyatli o'chirildi",
            venue: deletedVenue,
        });
    } catch (error) {
        console.error("Error deleting venue:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createVenue,
    getVenues,
    getVenueById,
    updateVenue,
    deleteVenue,
    searchVenue,
};