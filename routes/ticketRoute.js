const express = require("express");
const router = express.Router();

const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
} = require("../controllers/ticket.controller");

const {
    ticketValidationSchema,
    updateTicketValidationSchema,
} = require("../validation/ticketValidation");

const validateSchema = (schema) => (req, res, next) => {

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    next();
};

/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Ticket API
 */

/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: Create Ticket
 *     tags: [Ticket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - seat_id
 *               - price
 *               - service_fee
 *               - status_id
 *               - ticket_type
 *             properties:
 *               event_id:
 *                 type: string
 *                 example: 6879c4a3b8c1d1e5a1234567
 *               seat_id:
 *                 type: string
 *                 example: 6879c4a3b8c1d1e5a1234568
 *               price:
 *                 type: number
 *                 example: 150000
 *               service_fee:
 *                 type: number
 *                 example: 10000
 *               status_id:
 *                 type: integer
 *                 example: 1
 *               ticket_type:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Ticket created successfully
 */
router.post(
    "/",
    validateSchema(ticketValidationSchema),
    createTicket
);

/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Get all tickets
 *     tags: [Ticket]
 *     responses:
 *       200:
 *         description: List of tickets
 */
router.get("/", getTickets);

/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Get Ticket by ID
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket found
 *       404:
 *         description: Ticket not found
 */
router.get("/:id", getTicketById);

/**
 * @swagger
 * /ticket/{id}:
 *   put:
 *     summary: Update Ticket
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *                 example: 6879c4a3b8c1d1e5a1234567
 *               seat_id:
 *                 type: string
 *                 example: 6879c4a3b8c1d1e5a1234568
 *               price:
 *                 type: number
 *                 example: 150000
 *               service_fee:
 *                 type: number
 *                 example: 10000
 *               status_id:
 *                 type: integer
 *                 example: 1
 *               ticket_type:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       404:
 *         description: Ticket not found
 */
router.put(
    "/:id",
    validateSchema(updateTicketValidationSchema),
    updateTicket
);

/**
 * @swagger
 * /ticket/{id}:
 *   delete:
 *     summary: Delete Ticket
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 */
router.delete("/:id", deleteTicket);

module.exports = router;