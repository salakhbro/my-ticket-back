const { VenuePhoto } = require("../model/venue_photoSchema");

// ----------------- Create Venue Photo -----------------
const createVenuePhoto = async (req, res) => {
    try {
        const { venueId, url } = req.body;

        const newPhoto = new VenuePhoto({
            venueId,
            url,
        });

        await newPhoto.save();

        const populatedPhoto = await VenuePhoto.findById(newPhoto._id).populate(
            "venueId"
        );

        return res.status(201).json({
            success: true,
            message: "Venue rasmi muvaffaqiyatli qo'shildi.",
            data: populatedPhoto,
        });
    } catch (error) {
        console.error("Create Venue Photo Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Venue rasmini saqlashda xato yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Get All Venue Photos (Populate bilan) -----------------
const getVenuePhotos = async (req, res) => {
    try {
        const photos = await VenuePhoto.find({}).populate("venueId");

        res.json({
            success: true,
            message: "Barcha venue rasmlari ro'yxati olingan.",
            innerData: photos,
        });
    } catch (error) {
        console.error("Get Venue Photos Error:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Rasmlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------- Get Venue Photo By ID (Populate bilan) -----------------
const getVenuePhotoById = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await VenuePhoto.findById(id).populate("venueId");

        if (!photo) {
            return res.status(404).json({
                success: false,
                message: "Rasm topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Rasm topildi",
            photo,
        });
    } catch (error) {
        console.error("GET VENUE PHOTO BY ID ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ----------------- Update Venue Photo -----------------
const updateVenuePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const { venueId, url } = req.body;

        const updateData = { venueId, url };

        const updatedPhoto = await VenuePhoto.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("venueId");

        if (!updatedPhoto) {
            return res.status(404).json({
                success: false,
                message: "Rasm topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Venue rasmi yangilandi",
            photo: updatedPhoto,
        });
    } catch (error) {
        console.error("Error updating venue photo:", error.message);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Venue rasmini yangilashda xato yuz berdi.",
            error: error.message,
        });
    }
};

// ----------------- Search Venue Photo -----------------
const searchVenuePhoto = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query" });
        }

        const result = await VenuePhoto.find({
            url: { $regex: query, $options: "i" },
        }).populate("venueId");

        if (result.length === 0) {
            return res.status(404).json({ message: "Bunday rasm topilmadi" });
        }

        res.json({ message: "Search results", photos: result });
    } catch (error) {
        console.error("Error fetching venue photos:", error);
        res.status(500).json({ message: "Server error: Failed to fetch photos" });
    }
};

// ----------------- Delete Venue Photo -----------------
const deleteVenuePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPhoto = await VenuePhoto.findByIdAndDelete(id);

        if (!deletedPhoto) {
            return res.status(404).json({
                success: false,
                message: "Rasm topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Rasm o'chirildi",
            photo: deletedPhoto,
        });
    } catch (error) {
        console.error("Error deleting photo:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createVenuePhoto,
    getVenuePhotos,
    getVenuePhotoById,
    updateVenuePhoto,
    deleteVenuePhoto,
    searchVenuePhoto,
};