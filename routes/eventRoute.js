const express = require("express");
const router = express.Router();

const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    searchEvent
} = require("../controllers/event.controller");

const {
    createEventValidation,
    updateEventValidation,
    idValidation
} = require("../validation/eventValidation");

// Body validatsiyasi uchun middleware
const validateBody = (schema) => {
    return (req, res, next) => {
        if (!schema) {
            return res.status(500).json({ success: false, message: "Validation schema missing" });
        }
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.details.map((item) => item.message)
            });
        }
        next();
    };
};

// Params (ID) validatsiyasi uchun middleware
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID parameter"
            });
        }
        next();
    };
};

// ==================== SWAGGER ====================
/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Event API
 */

// ==================== ROUTES ====================

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Create Event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - photo
 *               - start_date
 *               - start_time
 *               - finish_date
 *               - finish_time
 *               - info
 *               - event_type_id
 *               - human_category_id
 *               - venue_id
 *               - lang_id
 *               - release_date
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tech Innovation Summit 2027
 *               photo:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               start_date:
 *                 type: string
 *                 example: "2026-10-15"
 *               start_time:
 *                 type: string
 *                 example: "09:00"
 *               finish_date:
 *                 type: string
 *                 example: "2026-10-15"
 *               finish_time:
 *                 type: string
 *                 example: "18:00"
 *               info:
 *                 type: string
 *                 example: A technology and innovation event
 *               event_type_id:
 *                 type: string
 *                 example: 68a123456789abcdef123456
 *               human_category_id:
 *                 type: string
 *                 example: 68a123456789abcdef123457
 *               venue_id:
 *                 type: string
 *                 example: 68a123456789abcdef123458
 *               lang_id:
 *                 type: string
 *                 example: 68a123456789abcdef123459
 *               release_date:
 *                 type: string
 *                 example: "2026-09-01"
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateBody(createEventValidation), createEvent);

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 */
router.get("/", getAllEvents);

/**
 * @swagger
 * /event/search/{title}:
 *   get:
 *     summary: Search Event
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *           example: Tech
 *     responses:
 *       200:
 *         description: Search result
 *       500:
 *         description: Server error
 */
router.get("/search/:title", searchEvent);

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Get Event by ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 68a123456789abcdef123456
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get("/:id", validateParams(idValidation), getEventById);

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update Event
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 68a123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.put(
    "/:id",
    validateParams(idValidation),
    validateBody(updateEventValidation),
    updateEvent
);

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Delete Event
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 68a123456789abcdef123456
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", validateParams(idValidation), deleteEvent);

module.exports = router;