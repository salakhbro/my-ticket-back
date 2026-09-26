// ✅ TO'G'RI IMPORT:
const EventType = require("../model/event_typeSchema");

const createEventType = async (req, res) => {
    try {
        const { name, parent_event_type_id } = req.body;

        const eventType = await EventType.create({
            name,
            parent_event_type_id: parent_event_type_id || null
        });

        res.status(201).json({
            success: true,
            message: "Event type yaratildi",
            data: eventType
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        });
    }
};

const getEventTypes = async (req, res) => {
    try {
        const eventTypes = await EventType
            .find()
            .populate("parent_event_type_id");

        res.status(200).json({
            success: true,
            count: eventTypes.length,
            data: eventTypes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        });
    }
};

const getEventTypeById = async (req, res) => {
    try {
        const eventType = await EventType
            .findById(req.params.id)
            .populate("parent_event_type_id");

        if (!eventType) {
            return res.status(404).json({
                success: false,
                message: "Event type topilmadi"
            });
        }

        res.status(200).json({
            success: true,
            data: eventType
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        });
    }
};

const updateEventType = async (req, res) => {
    try {
        const eventType = await EventType
            .findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
            .populate("parent_event_type_id");

        if (!eventType) {
            return res.status(404).json({
                success: false,
                message: "Event type topilmadi"
            });
        }

        res.status(200).json({
            success: true,
            message: "Event type yangilandi",
            data: eventType
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        });
    }
};

const deleteEventType = async (req, res) => {
    try {
        const eventType = await EventType.findByIdAndDelete(req.params.id);

        if (!eventType) {
            return res.status(404).json({
                success: false,
                message: "Event type topilmadi"
            });
        }

        res.status(200).json({
            success: true,
            message: "Event type o'chirildi",
            data: eventType
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        });
    }
};

module.exports = {
    createEventType,
    getEventTypes,
    getEventTypeById,
    updateEventType,
    deleteEventType
};