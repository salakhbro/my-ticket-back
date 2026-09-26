const mongoose = require("mongoose");
const CustomerCard = require("../model/customer_cardSchema");


// Error handler
const fail = (res, err, fallback) => {
    console.error(fallback, err);

    if (err && err.code === 11000) {
        const field =
            Object.keys(err.keyPattern || {})[0] ||
            "field";

        return res.status(409).json({
            success: false,
            message: `Customer card with this ${field} already exists`,
        });
    }

    return res.status(500).json({
        success: false,
        message: fallback,
    });
};


// Check MongoDB ID
const badId = (id) => {
    return !mongoose.isValidObjectId(id);
};


// =========================
// CREATE
// =========================

const createCustomerCard = async (req, res) => {
    try {
        const customerCard =
            await CustomerCard.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Customer card created successfully",
            data: customerCard,
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to create customer card"
        );
    }
};


// =========================
// READ ALL
// =========================

const listCustomerCards = async (req, res) => {
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

        const filter = {};

        // Search by customer_id
        if (req.query.customer_id) {
            const customerId =
                Number(req.query.customer_id);

            if (!Number.isNaN(customerId)) {
                filter.customer_id = customerId;
            }
        }

        // Filter active cards
        if (req.query.is_active !== undefined) {
            filter.is_active =
                req.query.is_active === "true";
        }

        // Filter main cards
        if (req.query.is_main !== undefined) {
            filter.is_main =
                req.query.is_main === "true";
        }

        const skip = (page - 1) * limit;

        const [items, total] =
            await Promise.all([
                CustomerCard.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                CustomerCard.countDocuments(filter),
            ]);

        return res.status(200).json({
            success: true,

            meta: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },

            data: items,
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to fetch customer cards"
        );
    }
};


// =========================
// READ ONE
// =========================

const getCustomerCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (badId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer card id",
            });
        }

        const customerCard =
            await CustomerCard.findById(id);

        if (!customerCard) {
            return res.status(404).json({
                success: false,
                message: "Customer card not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: customerCard,
        });
    } catch (err) {
        return fail(
            res,
            err,
            "Failed to fetch customer card"
        );
    }
};


// =========================
// UPDATE
// =========================

const updateCustomerCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (badId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer card id",
            });
        }

        const customerCard =
            await CustomerCard.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!customerCard) {
            return res.status(404).json({
                success: false,
                message: "Customer card not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Customer card updated successfully",
            data: customerCard,
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to update customer card"
        );
    }
};


// =========================
// DELETE
// =========================

const removeCustomerCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (badId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer card id",
            });
        }

        const customerCard =
            await CustomerCard.findByIdAndDelete(id);

        if (!customerCard) {
            return res.status(404).json({
                success: false,
                message: "Customer card not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Customer card deleted successfully",
        });

    } catch (err) {
        return fail(
            res,
            err,
            "Failed to delete customer card"
        );
    }
};


module.exports = {
    createCustomerCard,
    listCustomerCards,
    getCustomerCard,
    updateCustomerCard,
    removeCustomerCard,
};