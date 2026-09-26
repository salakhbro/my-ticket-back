const { CartItem } = require("../model/cart_itemSchema");

// Create CartItem
const createCartItem = async (req, res) => {
    try {
        const { ticket_id, cart_id } = req.body;

        const newCartItem = new CartItem({
            ticket_id,
            cart_id
        });

        await newCartItem.save();

        return res.status(201).json({
            success: true,
            message: "Cart item muvaffaqiyatli yaratildi.",
            innerData: newCartItem
        });
    } catch (error) {
        console.error("Cart item yaratishda xato:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Cart item yaratishda xato yuz berdi.",
            error: error.message
        });
    }
};

// Get All CartItems
const getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find({})
            .populate("ticket_id")
            .populate("cart_id");

        res.json({
            success: true,
            message: "Barcha cart itemlar ro'yxati olingan.",
            innerData: cartItems
        });
    } catch (error) {
        console.error("Cart itemlarni olishda xato:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Cart itemlarni olishda xato yuz berdi."
        });
    }
};

// Get CartItem By ID
const getCartItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItem.findById(id)
            .populate("ticket_id")
            .populate("cart_id");

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item topilmadi"
            });
        }

        res.json({
            success: true,
            message: "Cart item topildi",
            innerData: cartItem
        });
    } catch (error) {
        console.error("GET CART ITEM BY ID ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update CartItem
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { ticket_id, cart_id } = req.body;

        const updateData = {};
        if (ticket_id) updateData.ticket_id = ticket_id;
        if (cart_id) updateData.cart_id = cart_id;

        const updatedCartItem = await CartItem.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
            .populate("ticket_id")
            .populate("cart_id");

        if (!updatedCartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item topilmadi"
            });
        }

        res.json({
            success: true,
            message: "Cart item ma'lumotlari yangilandi",
            innerData: updatedCartItem
        });
    } catch (error) {
        console.error("Cart itemni yangilashda xato:", error.message);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Cart item ma'lumotlarini yangilashda xato yuz berdi.",
            error: error.message
        });
    }
};

// Delete CartItem
const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCartItem = await CartItem.findByIdAndDelete(id);

        if (!deletedCartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item topilmadi"
            });
        }

        res.json({
            success: true,
            message: "Cart item muvaffaqiyatli o'chirildi",
            innerData: deletedCartItem
        });
    } catch (error) {
        console.error("Cart itemni o'chirishda xato:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createCartItem,
    getCartItems,
    getCartItemById,
    updateCartItem,
    deleteCartItem
};