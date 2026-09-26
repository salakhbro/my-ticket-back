const Booking = require("../model/bookingSchema");

const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        const populatedBooking = await Booking.findById(booking._id)
            .populate("cart_id");

        res.status(201).json({
            message: "Booking created successfully",
            data: populatedBooking,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("cart_id");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("cart_id");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        const populatedBooking = await Booking.findById(booking._id)
            .populate("cart_id");

        res.status(200).json({
            message: "Booking updated successfully",
            data: populatedBooking,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.status(200).json({
            message: "Booking deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};