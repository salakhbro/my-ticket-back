const { Router } = require("express");

const eventType = Router();

const {
    createEventType,
    getEventTypes,
    getEventTypeById,
    updateEventType,
    deleteEventType
} = require("../controllers/event_type.controller");

const {
    eventTypeValidationSchema,
    updateEventTypeValidationSchema
} = require("../validation/event_typeValidation");

// ================= VALIDATION MIDDLEWARES =================

const validateCreate = (req, res, next) => {
    const { error } = eventTypeValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

const validateUpdate = (req, res, next) => {
    const { error } = updateEventTypeValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

// ================= SWAGGER DOCS =================

/**
 * @swagger
 * tags:
 *   name: Event Type
 *   description: Event typelarni boshqarish API
 */

/**
 * @swagger
 * /event-type:
 *   post:
 *     summary: Yangi event type yaratish
 *     tags: [Event Type]
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
 *                 example: "Konsert"
 *               parent_event_type_id:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *     responses:
 *       201:
 *         description: Event type yaratildi
 *       400:
 *         description: Validation error
 */
eventType.post("/", validateCreate, createEventType);

/**
 * @swagger
 * /event-type:
 *   get:
 *     summary: Barcha event typelarni olish
 *     tags: [Event Type]
 *     responses:
 *       200:
 *         description: Event typelar ro'yxati
 */
eventType.get("/", getEventTypes);

/**
 * @swagger
 * /event-type/{id}:
 *   get:
 *     summary: ID orqali event type olish
 *     tags: [Event Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *     responses:
 *       200:
 *         description: Event type topildi
 *       404:
 *         description: Event type topilmadi
 */
eventType.get("/:id", getEventTypeById);

/**
 * @swagger
 * /event-type/{id}:
 *   put:
 *     summary: Event typeni yangilash
 *     tags: [Event Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jonli Konsert"
 *               parent_event_type_id:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *     responses:
 *       200:
 *         description: Event type yangilandi
 *       404:
 *         description: Event type topilmadi
 */
eventType.put("/:id", validateUpdate, updateEventType);

/**
 * @swagger
 * /event-type/{id}:
 *   delete:
 *     summary: Event typeni o'chirish
 *     tags: [Event Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *     responses:
 *       200:
 *         description: Event type o'chirildi
 *       404:
 *         description: Event type topilmadi
 */
eventType.delete("/:id", deleteEventType);

module.exports = eventType;