const { seat_type } = require("../model/seat_typeSchema");

const {
    createSeatTypeSchema,
    updateSeatTypeSchema
} = require("../validation/seat_typeValidation");


// GET ALL
const getAllSeatTypes = async (req, res) => {
    try {
        const seatTypes = await seat_type.find();

        res.status(200).json({
            success: true,
            count: seatTypes.length,
            data: seatTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
};


// GET BY ID
const getSeatTypeById = async (req, res) => {
    try {
        const { id } = req.params;

        const seatType = await seat_type.findById(id);

        if (!seatType) {
            return res.status(404).json({
                success: false,
                message: "Joy turi topilmadi"
            });
        }

        res.status(200).json({
            success: true,
            data: seatType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
};


// CREATE
const createSeatType = async (req, res) => {
    try {
        const { error, value } = createSeatTypeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const newSeatType = await seat_type.create(value);

        res.status(201).json({
            success: true,
            message: "Joy turi muvaffaqiyatli yaratildi",
            data: newSeatType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
};


// UPDATE
const updateSeatType = async (req, res) => {
    try {
        const { id } = req.params;

        const { error, value } = updateSeatTypeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const seatType = await seat_type.findById(id);

        if (!seatType) {
            return res.status(404).json({
                success: false,
                message: "Joy turi topilmadi"
            });
        }

        const updatedSeatType = await seat_type.findByIdAndUpdate(
            id,
            value,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Joy turi muvaffaqiyatli yangilandi",
            data: updatedSeatType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
};


// DELETE
const deleteSeatType = async (req, res) => {
    try {
        const { id } = req.params;

        const seatType = await seat_type.findById(id);

        if (!seatType) {
            return res.status(404).json({
                success: false,
                message: "Joy turi topilmadi"
            });
        }

        await seat_type.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Joy turi muvaffaqiyatli o'chirildi"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
};


module.exports = {
    getAllSeatTypes,
    getSeatTypeById,
    createSeatType,
    updateSeatType,
    deleteSeatType
};