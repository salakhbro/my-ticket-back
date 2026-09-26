const { Router } = require("express");

const customerAddress = Router();

const {
    createCustomerAddress,
    getCustomerAddresses,
    getCustomerAddressById,
    updateCustomerAddress,
    deleteCustomerAddress,
} = require("../controllers/customer_address.controller");

const {
    createCustomerAddressValidationSchema,
    updateCustomerAddressValidationSchema,
} = require("../validation/customer_addressValidation");


// ================= VALIDATION =================

const validateCreate = (req, res, next) => {
    const { error } =
        createCustomerAddressValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};

const validateUpdate = (req, res, next) => {
    const { error } =
        updateCustomerAddressValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};


// ================= SWAGGER =================

/**
 * @swagger
 * tags:
 *   name: Customer Address
 *   description: Customer manzillarini boshqarish API
 */


/**
 * @swagger
 * /customer-address/create:
 *   post:
 *     summary: Yangi customer address qo'shish
 *     tags: [Customer Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - districtId
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "65a123456789abcdef123456"
 *               name:
 *                 type: string
 *                 example: "Uy manzili"
 *               regionId:
 *                 type: string
 *                 example: "65b123456789abcdef123456"
 *               districtId:
 *                 type: string
 *                 example: "65c123456789abcdef123456"
 *               street:
 *                 type: string
 *                 example: "Amir Temur ko'chasi"
 *               house:
 *                 type: string
 *                 example: "25"
 *               flat:
 *                 type: integer
 *                 example: 12
 *               location:
 *                 type: string
 *                 example: "Toshkent shahri"
 *               postIndex:
 *                 type: string
 *                 example: "100011"
 *               info:
 *                 type: string
 *                 example: "Qo'shimcha ma'lumot"
 *     responses:
 *       201:
 *         description: Customer address muvaffaqiyatli yaratildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server xatosi
 */

customerAddress.post(
    "/create",
    validateCreate,
    createCustomerAddress
);


/**
 * @swagger
 * /customer-address/getall:
 *   get:
 *     summary: Barcha customer addresslarni olish
 *     tags: [Customer Address]
 *     responses:
 *       200:
 *         description: Customer addresslar ro'yxati
 *       500:
 *         description: Server xatosi
 */

customerAddress.get(
    "/getall",
    getCustomerAddresses
);


/**
 * @swagger
 * /customer-address/getbyid/{id}:
 *   get:
 *     summary: ID orqali customer address olish
 *     tags: [Customer Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a123456789abcdef123456"
 *     responses:
 *       200:
 *         description: Customer address topildi
 *       404:
 *         description: Customer address topilmadi
 *       500:
 *         description: Server xatosi
 */

customerAddress.get(
    "/getbyid/:id",
    getCustomerAddressById
);


/**
 * @swagger
 * /customer-address/update/{id}:
 *   put:
 *     summary: Customer addressni yangilash
 *     tags: [Customer Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a123456789abcdef123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "65a123456789abcdef123456"
 *               name:
 *                 type: string
 *                 example: "Ish manzili"
 *               regionId:
 *                 type: string
 *                 example: "65b123456789abcdef123456"
 *               districtId:
 *                 type: string
 *                 example: "65c123456789abcdef123456"
 *               street:
 *                 type: string
 *                 example: "Navoiy ko'chasi"
 *               house:
 *                 type: string
 *                 example: "15"
 *               flat:
 *                 type: integer
 *                 example: 8
 *               location:
 *                 type: string
 *                 example: "Toshkent"
 *               postIndex:
 *                 type: string
 *                 example: "100100"
 *               info:
 *                 type: string
 *                 example: "Ofis manzili"
 *     responses:
 *       200:
 *         description: Customer address yangilandi
 *       404:
 *         description: Customer address topilmadi
 *       400:
 *         description: Validation error
 */

customerAddress.put(
    "/update/:id",
    validateUpdate,
    updateCustomerAddress
);


/**
 * @swagger
 * /customer-address/delete/{id}:
 *   delete:
 *     summary: Customer addressni o'chirish
 *     tags: [Customer Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a123456789abcdef123456"
 *     responses:
 *       200:
 *         description: Customer address o'chirildi
 *       404:
 *         description: Customer address topilmadi
 *       500:
 *         description: Server xatosi
 */

customerAddress.delete(
    "/delete/:id",
    deleteCustomerAddress
);


module.exports = customerAddress;