const { ticket_status } = require("../model/ticket_statusSchema");
const { ticketStatusValidation } = require("../validation/ticket_statusValidation");


// CREATE
const createTicketStatus = async (req, res) => {
    try {
        const { error } = ticketStatusValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const ticketStatus = await ticket_status.create(req.body);

        res.status(201).json({
            success: true,
            message: "Ticket status created successfully",
            data: ticketStatus
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// GET ALL
const getTicketStatuses = async (req, res) => {
    try {
        const ticketStatuses = await ticket_status.find();

        res.status(200).json({
            success: true,
            message: "Ticket statuses retrieved successfully",
            data: ticketStatuses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// GET BY ID
const getTicketStatusById = async (req, res) => {
    try {
        const ticketStatus = await ticket_status.findById(req.params.id);

        if (!ticketStatus) {
            return res.status(404).json({
                success: false,
                message: "Ticket status not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Ticket status found",
            data: ticketStatus
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// UPDATE
const updateTicketStatus = async (req, res) => {
    try {
        const { error } = ticketStatusValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const ticketStatus = await ticket_status.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!ticketStatus) {
            return res.status(404).json({
                success: false,
                message: "Ticket status not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Ticket status updated successfully",
            data: ticketStatus
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// DELETE
const deleteTicketStatus = async (req, res) => {
    try {
        const ticketStatus = await ticket_status.findByIdAndDelete(
            req.params.id
        );

        if (!ticketStatus) {
            return res.status(404).json({
                success: false,
                message: "Ticket status not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Ticket status deleted successfully",
            data: ticketStatus
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


module.exports = {
    createTicketStatus,
    getTicketStatuses,
    getTicketStatusById,
    updateTicketStatus,
    deleteTicketStatus
};