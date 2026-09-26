const { Router } = require("express");
const route = Router();

const {
    createTicketStatus,
    getTicketStatuses,
    getTicketStatusById,
    updateTicketStatus,
    deleteTicketStatus
} = require("../controllers/ticket_status.controller");

/**
 * @swagger
 * tags:
 *   name: Ticket Status
 *   description: Ticket status CRUD operations
 */

/**
 * @swagger
 * /ticket-status:
 *   post:
 *     summary: Create ticket status
 *     tags: [Ticket Status]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The ticket status name
 *                 example: "Paid"
 *     responses:
 *       201:
 *         description: Ticket status created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
route.post("/", createTicketStatus);

/**
 * @swagger
 * /ticket-status:
 *   get:
 *     summary: Get all ticket statuses
 *     tags: [Ticket Status]
 *     responses:
 *       200:
 *         description: Ticket statuses retrieved successfully
 *       500:
 *         description: Internal server error
 */
route.get("/", getTicketStatuses);

/**
 * @swagger
 * /ticket-status/{id}:
 *   get:
 *     summary: Get ticket status by ID
 *     tags: [Ticket Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket status ID
 *     responses:
 *       200:
 *         description: Ticket status found
 *       404:
 *         description: Ticket status not found
 *       500:
 *         description: Internal server error
 */
route.get("/:id", getTicketStatusById);

/**
 * @swagger
 * /ticket-status/{id}:
 *   put:
 *     summary: Update ticket status
 *     tags: [Ticket Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket status ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The ticket status name
 *                 example: "Pending"
 *     responses:
 *       200:
 *         description: Ticket status updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Ticket status not found
 *       500:
 *         description: Internal server error
 */
route.put("/:id", updateTicketStatus);

/**
 * @swagger
 * /ticket-status/{id}:
 *   delete:
 *     summary: Delete ticket status
 *     tags: [Ticket Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket status ID
 *     responses:
 *       200:
 *         description: Ticket status deleted successfully
 *       404:
 *         description: Ticket status not found
 *       500:
 *         description: Internal server error
 */
route.delete("/:id", deleteTicketStatus);

module.exports = route;