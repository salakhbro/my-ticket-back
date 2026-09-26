const { payment_method } = require("../model/payment_methodSchema");
const { paymentMethodValidation } = require("../validation/payment_methodValidation");

const createPaymentMethod = async (req, res) => {
    try {
        const { error } = paymentMethodValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const paymentMethod = await payment_method.create(req.body);

        res.status(201).json({
            success: true,
            message: "Payment method created",
            data: paymentMethod
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await payment_method.find();

        res.status(200).json({
            success: true,
            count: paymentMethods.length,
            data: paymentMethods
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getPaymentMethodById = async (req, res) => {
    try {
        const paymentMethod = await payment_method.findById(req.params.id);

        if (!paymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Payment method not found"
            });
        }

        res.status(200).json({
            success: true,
            data: paymentMethod
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updatePaymentMethod = async (req, res) => {
    try {
        const { error } = paymentMethodValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const paymentMethod = await payment_method.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!paymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Payment method not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment method updated",
            data: paymentMethod
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deletePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await payment_method.findByIdAndDelete(
            req.params.id
        );

        if (!paymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Payment method not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment method deleted",
            data: paymentMethod
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod
};