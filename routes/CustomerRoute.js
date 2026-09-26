const { Router } = require("express");

const ctrl = require("../controllers/customer.controller.js");

const {
    createCustomerSchema,
    updateCustomerSchema,
    validate,
} = require("../validation/CustomerValidation.js");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management API
 *
 * components:
 *   schemas:
 *
 *     Customer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "665f1c2e8a1b2c3d4e5f6a7b"
 *
 *         first_name:
 *           type: string
 *           example: "Salakh"
 *
 *         last_name:
 *           type: string
 *           example: "Karimov"
 *
 *         phone:
 *           type: string
 *           example: "+998901234567"
 *
 *         email:
 *           type: string
 *           example: "salakh@example.com"
 *
 *         birth_date:
 *           type: string
 *           format: date
 *           example: "2004-03-21"
 *
 *         gender:
 *           type: integer
 *           enum: [1, 2]
 *           description: "1 = male, 2 = female"
 *
 *         lang_id:
 *           type: integer
 *           example: 1
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
 *     CustomerCreate:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - phone
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           example: "Salakh"
 *
 *         last_name:
 *           type: string
 *           example: "Karimov"
 *
 *         phone:
 *           type: string
 *           example: "+998901234567"
 *
 *         email:
 *           type: string
 *           example: "salakh@example.com"
 *
 *         password:
 *           type: string
 *           example: "Strong123!"
 *
 *         birth_date:
 *           type: string
 *           format: date
 *           example: "2004-03-21"
 *
 *         gender:
 *           type: integer
 *           enum: [1, 2]
 *           example: 1
 *
 *         lang_id:
 *           type: integer
 *           example: 1
 *
 *
 *     CustomerUpdate:
 *       type: object
 *       description: Send only the fields you want to change
 *       properties:
 *         first_name:
 *           type: string
 *           example: "Muhammad"
 *
 *         last_name:
 *           type: string
 *           example: "Aliyev"
 *
 *         phone:
 *           type: string
 *           example: "+998901112233"
 *
 *         email:
 *           type: string
 *           example: "new@example.com"
 *
 *         password:
 *           type: string
 *           example: "NewPassword123!"
 *
 *         birth_date:
 *           type: string
 *           format: date
 *           example: "2005-05-10"
 *
 *         gender:
 *           type: integer
 *           enum: [1, 2]
 *
 *         lang_id:
 *           type: integer
 *           example: 1
 */


/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerCreate'
 *
 *     responses:
 *       201:
 *         description: Customer created successfully
 *
 *       400:
 *         description: Validation error
 *
 *       409:
 *         description: Phone or email already exists
 *
 *       500:
 *         description: Server error
 */
router.post(
    "/",
    validate(createCustomerSchema),
    ctrl.createCustomer
);


/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags:
 *       - Customers
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         description: Number of customers per page
 *
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search by first name, last name, email or phone
 *
 *     responses:
 *       200:
 *         description: Customers fetched successfully
 *
 *       500:
 *         description: Server error
 */
router.get(
    "/",
    ctrl.listCustomers
);


/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags:
 *       - Customers
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
 *         description: Customer found
 *
 *       400:
 *         description: Invalid customer ID
 *
 *       404:
 *         description: Customer not found
 *
 *       500:
 *         description: Server error
 */
router.get(
    "/:id",
    ctrl.getCustomer
);


/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags:
 *       - Customers
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "665f1c2e8a1b2c3d4e5f6a7b"
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerUpdate'
 *
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *
 *       400:
 *         description: Validation error or invalid ID
 *
 *       404:
 *         description: Customer not found
 *
 *       409:
 *         description: Phone or email already exists
 *
 *       500:
 *         description: Server error
 */
router.put(
    "/:id",
    validate(updateCustomerSchema),
    ctrl.updateCustomer
);


/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags:
 *       - Customers
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
 *         description: Customer deleted successfully
 *
 *       400:
 *         description: Invalid customer ID
 *
 *       404:
 *         description: Customer not found
 *
 *       500:
 *         description: Server error
 */
router.delete(
    "/:id",
    ctrl.removeCustomer
);


module.exports = router;