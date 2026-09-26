const Cart = require("../model/cartSchema");

// ----------------- Create Cart ---------------- //
const createCart = async (req, res) => {
    try {
        const { customer_id, status_id, fineshedAt } = req.body;

        const newCart = new Cart({
            customer_id,
            status_id,
            fineshedAt: fineshedAt || null
        });

        await newCart.save();

        return res.status(201).json({
            success: true,
            message: "Savatcha muvaffaqiyatli yaratildi.",
            cart: newCart
        });
    } catch (error) {
        console.error("Xato:", error);

        return res.status(500).json({
            success: false,
            message: "Server xatosi: Savatcha yaratishda xato yuz berdi.",
            error: error.message
        });
    }
};

// ----------------- Get Carts ---------------- //
const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find({}).populate("customer_id");

        res.json({
            success: true,
            message: "Barcha savatchalar ro'yxati olingan.",
            innerData: carts
        });
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Savatchalarni olishda xato yuz berdi."
        });
    }
};

// ----------------- Get Cart By ID ---------------- //
const getCartById = async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await Cart.findById(cartId).populate("customer_id");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.json({
            message: "Cart found",
            cart
        });
    } catch (error) {
        console.error("GET CART BY ID ERROR:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// ---------------------- Update Cart ------------------------
const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_id, status_id, fineshedAt } = req.body;

        const updateData = {
            customer_id,
            status_id,
            fineshedAt
        };

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate("customer_id");

        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        res.json({
            success: true,
            message: "Cart informations updated",
            cart: updatedCart
        });
    } catch (error) {
        console.error("Error updating cart:", error.message);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Savatcha ma'lumotlarini yangilashda xato yuz berdi.",
            error: error.message
        });
    }
};

// ---------------------- Delete Cart ------------------------
const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCart = await Cart.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        res.json({
            success: true,
            message: "Cart deleted successfully",
            cart: deletedCart
        });
    } catch (error) {
        console.error("Error deleting cart:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createCart,
    getCarts,
    getCartById,
    updateCart,
    deleteCart
};