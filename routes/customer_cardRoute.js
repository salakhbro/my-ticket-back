const { Router } = require("express");

const ctrl = require(
    "../controllers/customer_card.controller.js"
);

const {
    createCustomerCardSchema,
    updateCustomerCardSchema,
    validate,
} = require(
    "../validation/customer_cardValidation.js"
);

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Customer Cards
 *   description: Customer card management API
 *
 * components:
 *   schemas:
 *
 *     CustomerCard:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "665f1c2e8a1b2c3d4e5f6a7b"
 *
 *         customer_id:
 *           type: integer
 *           example: 1
 *
 *         name:
 *           type: string
 *           example: "Salakh Karimov"
 *
 *         phone:
 *           type: string
 *           example: "+998901234567"
 *
 *         number:
 *           type: string
 *           example: "8600123456789012"
 *
 *         year:
 *           type: string
 *           example: "27"
 *
 *         month:
 *           type: string
 *           example: "05"
 *
 *         is_active:
 *           type: boolean
 *           example: true
 *
 *         is_main:
 *           type: boolean
 *           example: true
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *
 *     CustomerCardCreate:
 *       type: object
 *       required:
 *         - customer_id
 *         - name
 *         - phone
 *         - number
 *         - year
 *         - month
 *       properties:
 *         customer_id:
 *           type: integer
 *           example: 1
 *
 *         name:
 *           type: string
 *           example: "Salakh Karimov"
 *
 *         phone:
 *           type: string
 *           example: "+998901234567"
 *
 *         number:
 *           type: string
 *           example: "8600123456789012"
 *
 *         year:
 *           type: string
 *           example: "27"
 *
 *         month:
 *           type: string
 *           example: "05"
 *
 *         is_active:
 *           type: boolean
 *           example: true
 *
 *         is_main:
 *           type: boolean
 *           example: false
 *
 *
 *     CustomerCardUpdate:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: integer
 *           example: 1
 *
 *         name:
 *           type: string
 *           example: "Muhammad Ali"
 *
 *         phone:
 *           type: string
 *           example: "+998901112233"
 *
 *         number:
 *           type: string
 *           example: "8600123456789012"
 *
 *         year:
 *           type: string
 *           example: "28"
 *
 *         month:
 *           type: string
 *           example: "12"
 *
 *         is_active:
 *           type: boolean
 *           example: true
 *
 *         is_main:
 *           type: boolean
 *           example: true
 */


/**
 * @swagger
 * /customer-cards:
 *   post:
 *     summary: Create customer card
 *     tags:
 *       - Customer Cards
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerCardCreate'
 *
 *     responses:
 *       201:
 *         description: Customer card created successfully
 *
 *       400:
 *         description: Validation error
 *
 *       500:
 *         description: Server error
 */
router.post(
    "/",
    validate(createCustomerCardSchema),
    ctrl.createCustomerCard
);


/**
 * @swagger
 * /customer-cards:
 *   get:
 *     summary: Get all customer cards
 *     tags:
 *       - Customer Cards
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *
 *       - in: query
 *         name: customer_id
 *         schema:
 *           type: integer
 *         description: Filter cards by customer ID
 *
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *
 *       - in: query
 *         name: is_main
 *         schema:
 *           type: boolean
 *
 *     responses:
 *       200:
 *         description: Customer cards fetched successfully
 *
 *       500:
 *         description: Server error
 */
router.get(
    "/",
    ctrl.listCustomerCards
);


/**
 * @swagger
 * /customer-cards/{id}:
 *   get:
 *     summary: Get customer card by ID
 *     tags:
 *       - Customer Cards
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "665f1c2e8a1b2c3d4e5f6a7b"
 *
 *     responses:
 *       200:
 *         description: Customer card found
 *
 *       400:
 *         description: Invalid customer card ID
 *
 *       404:
 *         description: Customer card not found
 *
 *       500:
 *         description: Server error
 */
router.get(
    "/:id",
    ctrl.getCustomerCard
);


/**
 * @swagger
 * /customer-cards/{id}:
 *   put:
 *     summary: Update customer card
 *     tags:
 *       - Customer Cards
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerCardUpdate'
 *
 *     responses:
 *       200:
 *         description: Customer card updated successfully
 *
 *       400:
 *         description: Validation error or invalid ID
 *
 *       404:
 *         description: Customer card not found
 *
 *       500:
 *         description: Server error
 */
router.put(
    "/:id",
    validate(updateCustomerCardSchema),
    ctrl.updateCustomerCard
);


/**
 * @swagger
 * /customer-cards/{id}:
 *   delete:
 *     summary: Delete customer card
 *     tags:
 *       - Customer Cards
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Customer card deleted successfully
 *
 *       400:
 *         description: Invalid ID
 *
 *       404:
 *         description: Customer card not found
 *
 *       500:
 *         description: Server error
 */
router.delete(
    "/:id",
    ctrl.removeCustomerCard
);


module.exports = router;