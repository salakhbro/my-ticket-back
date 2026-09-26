const { delivery_method } = require("../model/delivery_methodSchema");
const { deliveryMethodValidation } = require("../validation/delivery_methodValidation");

// CREATE
const createDeliveryMethod = async (req, res) => {
    try {
        const { error } = deliveryMethodValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const deliveryMethod = await delivery_method.create(req.body);

        res.status(201).json({
            success: true,
            message: "Delivery method created",
            data: deliveryMethod
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL
const getDeliveryMethods = async (req, res) => {
    try {
        const deliveryMethods = await delivery_method.find();

        res.status(200).json({
            success: true,
            count: deliveryMethods.length,
            data: deliveryMethods
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET BY ID
const getDeliveryMethodById = async (req, res) => {
    try {
        const deliveryMethod = await delivery_method.findById(req.params.id);

        if (!deliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Delivery method not found"
            });
        }

        res.status(200).json({
            success: true,
            data: deliveryMethod
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE
const updateDeliveryMethod = async (req, res) => {
    try {
        const { error } = deliveryMethodValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const deliveryMethod = await delivery_method.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!deliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Delivery method not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Delivery method updated",
            data: deliveryMethod
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE
const deleteDeliveryMethod = async (req, res) => {
    try {
        const deliveryMethod = await delivery_method.findByIdAndDelete(
            req.params.id
        );

        if (!deliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Delivery method not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Delivery method deleted",
            data: deliveryMethod
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createDeliveryMethod,
    getDeliveryMethods,
    getDeliveryMethodById,
    updateDeliveryMethod,
    deleteDeliveryMethod
};