const Seat = require("../model/seatSchema");

const createSeat = async (req, res) => {
    try {
        const seat = await Seat.create(req.body);

        const data = await Seat.findById(seat._id)
            .populate("venue_id")
            .populate("seat_type_id");

        res.status(201).json({
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

const getAllSeats = async (req, res) => {
    try {
        const data = await Seat.find()
            .populate("venue_id")
            .populate("seat_type_id");

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

const getSeatById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Seat.findById(id)
            .populate("venue_id")
            .populate("seat_type_id");

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Seat topilmadi",
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

const updateSeat = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Seat.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate("venue_id")
            .populate("seat_type_id");

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Seat topilmadi",
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

const deleteSeat = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Seat.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Seat topilmadi",
            });
        }

        res.status(200).json({
            success: true,
            message: "Seat o'chirildi",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createSeat,
    getAllSeats,
    getSeatById,
    updateSeat,
    deleteSeat,
};