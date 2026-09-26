const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Customer = require("../model/customerSchema");

const SALT_ROUNDS = 10;

// Error handler
const fail = (res, err, message) => {
    console.error(message, err);

    if (err && err.code === 11000) {
        const field =
            Object.keys(err.keyPattern || {})[0] || "field";

        return res.status(409).json({
            success: false,
            message: `Customer with this ${field} already exists`,
        });
    }

    return res.status(500).json({
        success: false,
        message,
    });
};

// Check MongoDB ID
const badId = (id) => {
    return !mongoose.isValidObjectId(id);
};

// Escape regex
const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};


// =========================
// CREATE
// =========================

const createCustomer = async (req, res) => {
    try {
        const {
            password,
            ...customerData
        } = req.body;

        const hashedPassword = await bcrypt.hash(
            password,
            SALT_ROUNDS
        );

        const customer = await Customer.create({
            ...customerData,
            hashed_password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer,
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to create customer"
        );
    }
};


// =========================
// READ ALL
// =========================

const listCustomers = async (req, res) => {
    try {
        const page = Math.max(
            parseInt(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                parseInt(req.query.limit) || 10,
                1
            ),
            100
        );

        const q =
            typeof req.query.q === "string"
                ? req.query.q.trim()
                : "";

        const filter = {};

        if (q) {
            const regex = new RegExp(
                escapeRegex(q),
                "i"
            );

            filter.$or = [
                { first_name: regex },
                { last_name: regex },
                { email: regex },
                { phone: regex },
            ];
        }

        const skip = (page - 1) * limit;

        const [customers, total] = await Promise.all([
            Customer.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Customer.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,

            meta: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },

            data: customers,
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to fetch customers"
        );
    }
};


// =========================
// READ ONE
// =========================

const getCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        if (badId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer id",
            });
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: customer,
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to fetch customer"
        );
    }
};


// =========================
// UPDATE
// =========================

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        if (badId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer id",
            });
        }

        const {
            password,
            ...changes
        } = req.body;

        // If password exists, hash it
        if (password) {
            changes.hashed_password =
                await bcrypt.hash(
                    password,
                    SALT_ROUNDS
                );
        }

        const customer =
            await Customer.findByIdAndUpdate(
                id,
                changes,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: customer,
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to update customer"
        );
    }
};


// =========================
// DELETE
// =========================

const removeCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        if (badId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer id",
            });
        }

        const customer =
            await Customer.findByIdAndDelete(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to delete customer"
        );
    }
};


module.exports = {
    createCustomer,
    listCustomers,
    getCustomer,
    updateCustomer,
    removeCustomer,
};