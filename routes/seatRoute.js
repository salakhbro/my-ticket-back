const express = require("express");
const router = express.Router();

const {
    createSeat,
    getAllSeats,
    getSeatById,
    updateSeat,
    deleteSeat,
} = require("../controllers/seat.controller");

const {
    createSeatValidation,
    updateSeatValidation,
} = require("../validation/seatValidation");

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
 *   name: Seat
 *   description: Seat management
 */

/**
 * @swagger
 * /seat:
 *   post:
 *     summary: Create Seat
 *     tags: [Seat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sector
 *               - row_number
 *               - number
 *               - venue_id
 *               - seat_type_id
 *               - location_in_schema
 *             properties:
 *               sector:
 *                 type: integer
 *                 example: 1
 *               row_number:
 *                 type: integer
 *                 example: 5
 *               number:
 *                 type: integer
 *                 example: 12
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               seat_type_id:
 *                 type: integer
 *                 example: 2
 *               location_in_schema:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                     example: 120
 *                   y:
 *                     type: number
 *                     example: 250
 *     responses:
 *       201:
 *         description: Seat created successfully
 *       400:
 *         description: Validation error
 */
router.post(
    "/",
    validateSchema(createSeatValidation),
    createSeat
);

/**
 * @swagger
 * /seat:
 *   get:
 *     summary: Get all Seats
 *     tags: [Seat]
 *     responses:
 *       200:
 *         description: List of seats
 */
router.get("/", getAllSeats);

/**
 * @swagger
 * /seat/{id}:
 *   get:
 *     summary: Get Seat by ID
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat found
 *       404:
 *         description: Seat not found
 */
router.get("/:id", getSeatById);

/**
 * @swagger
 * /seat/{id}:
 *   patch:
 *     summary: Update Seat
 *     tags: [Seat]
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
 *               sector:
 *                 type: integer
 *                 example: 2
 *               row_number:
 *                 type: integer
 *                 example: 8
 *               number:
 *                 type: integer
 *                 example: 15
 *               venue_id:
 *                 type: integer
 *                 example: 2
 *               seat_type_id:
 *                 type: integer
 *                 example: 1
 *               location_in_schema:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                     example: 150
 *                   y:
 *                     type: number
 *                     example: 320
 *     responses:
 *       200:
 *         description: Seat updated successfully
 *       404:
 *         description: Seat not found
 */
router.patch(
    "/:id",
    validateSchema(updateSeatValidation),
    updateSeat
);

/**
 * @swagger
 * /seat/{id}:
 *   delete:
 *     summary: Delete Seat
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat deleted successfully
 *       404:
 *         description: Seat not found
 */
router.delete("/:id", deleteSeat);

module.exports = router;