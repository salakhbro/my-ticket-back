const Ticket = require("../model/ticketSchema");

const createTicket = async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);

        const newTicket = await Ticket.findById(ticket._id)
            .populate("event_id")
            .populate("seat_id");

        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate("event_id")
            .populate("seat_id");

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate("event_id")
            .populate("seat_id");

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .populate("event_id")
            .populate("seat_id");

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
};