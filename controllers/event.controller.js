const { Event } = require("../model/eventSchema");

require("../model/event_typeSchema");
require("../model/human_categorySchema");
require("../model/venueSchema");
require("../model/langSchema");

// CREATE
const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("event_type_id")
            .populate("human_category_id")
            .populate("venue_id")
            .populate("lang_id");

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET BY ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("event_type_id")
            .populate("human_category_id")
            .populate("venue_id")
            .populate("lang_id");

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// SEARCH
const searchEvent = async (req, res) => {
    try {
        const { title } = req.params;

        const events = await Event.find({
            name: { $regex: title, $options: "i" }
        })
            .populate("event_type_id")
            .populate("human_category_id")
            .populate("venue_id")
            .populate("lang_id");

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate("event_type_id")
            .populate("human_category_id")
            .populate("venue_id")
            .populate("lang_id");

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: event
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    searchEvent
};