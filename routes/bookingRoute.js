const express = require("express");
const router = express.Router();

const {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
} = require("../controllers/booking.controller");

const {
    bookingValidationSchema,
    bookingUpdateValidationSchema,
} = require("../validation/bookingValidation");

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
 *   name: Booking
 *   description: Booking management
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart_id
 *               - finished
 *               - payment_method_id
 *               - delivery_method_id
 *               - status_id
 *             properties:
 *               cart_id:
 *                 type: string
 *                 example: "67c123456789012345678901"
 *               finished:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-07-20T18:00:00.000Z"
 *               payment_method_id:
 *                 type: integer
 *                 example: 2
 *               delivery_method_id:
 *                 type: integer
 *                 example: 1
 *               discount_coupon_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 10
 *               status_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post(
    "/",
    validateSchema(bookingValidationSchema),
    createBooking
);

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get("/", getBookings);

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Get booking by id
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking found
 *       404:
 *         description: Booking not found
 */
router.get("/:id", getBookingById);

/**
 * @swagger
 * /booking/{id}:
 *   patch:
 *     summary: Update booking
 *     tags: [Booking]
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
 *               cart_id:
 *                 type: string
 *                 example: "67c123456789012345678901"
 *               finished:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-07-20T18:00:00.000Z"
 *               payment_method_id:
 *                 type: integer
 *                 example: 2
 *               delivery_method_id:
 *                 type: integer
 *                 example: 1
 *               discount_coupon_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 10
 *               status_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Booking updated
 *       404:
 *         description: Booking not found
 */
router.patch(
    "/:id",
    validateSchema(bookingUpdateValidationSchema),
    updateBooking
);

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 */
router.delete("/:id", deleteBooking);

module.exports = router;