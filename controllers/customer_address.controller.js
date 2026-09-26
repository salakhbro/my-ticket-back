const { CustomerAddress } = require("../model/customer_addressSchema");


// ================= CREATE =================

const createCustomerAddress = async (req, res) => {
    try {
        const {
            customerId,
            name,
            regionId,
            districtId,
            street,
            house,
            flat,
            location,
            postIndex,
            info,
            customer_id,
            region_id,
            district_id,
        } = req.body;

        const address = await CustomerAddress.create({
            customerId,
            name,
            regionId,
            districtId,
            street,
            house,
            flat,
            location,
            postIndex,
            info,
            customer_id,
            region_id,
            district_id,
        });

        const result = await CustomerAddress.findById(address._id)
            .populate("customerId")
            .populate("regionId")
            .populate("districtId");

        res.status(201).json({
            success: true,
            message: "Customer address muvaffaqiyatli qo'shildi",
            data: result,
        });

    } catch (error) {
        console.error("CREATE CUSTOMER ADDRESS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Customer address qo'shishda xato yuz berdi",
            error: error.message,
        });
    }
};


// ================= GET ALL =================

const getCustomerAddresses = async (req, res) => {
    try {
        const addresses = await CustomerAddress.find({})
            .populate("customerId")
            .populate("districtId");

        res.json({
            success: true,
            message: "Barcha customer addresslar olindi",
            data: addresses,
        });

    } catch (error) {
        console.error("GET CUSTOMER ADDRESSES ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Customer addresslarni olishda xato yuz berdi",
            error: error.message,
        });
    }
};


// ================= GET BY ID =================

const getCustomerAddressById = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await CustomerAddress.findById(id)
            .populate("customerId")
            .populate("regionId")
            .populate("districtId");

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Customer address topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Customer address topildi",
            data: address,
        });

    } catch (error) {
        console.error("GET CUSTOMER ADDRESS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ================= UPDATE =================

const updateCustomerAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            customerId,
            name,
            regionId,
            districtId,
            street,
            house,
            flat,
            location,
            postIndex,
            info,
            customer_id,
            region_id,
            district_id,
        } = req.body;

        const updateData = {
            customerId,
            name,
            regionId,
            districtId,
            street,
            house,
            flat,
            location,
            postIndex,
            info,
            customer_id,
            region_id,
            district_id,
        };

        const updatedAddress =
            await CustomerAddress.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            )
                .populate("customerId")
                .populate("regionId")
                .populate("districtId");

        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: "Customer address topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Customer address yangilandi",
            data: updatedAddress,
        });

    } catch (error) {
        console.error("UPDATE CUSTOMER ADDRESS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Customer addressni yangilashda xato yuz berdi",
            error: error.message,
        });
    }
};


// ================= DELETE =================

const deleteCustomerAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAddress =
            await CustomerAddress.findByIdAndDelete(id);

        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: "Customer address topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Customer address o'chirildi",
            data: deletedAddress,
        });

    } catch (error) {
        console.error("DELETE CUSTOMER ADDRESS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Customer addressni o'chirishda xato yuz berdi",
            error: error.message,
        });
    }
};


module.exports = {
    createCustomerAddress,
    getCustomerAddresses,
    getCustomerAddressById,
    updateCustomerAddress,
    deleteCustomerAddress,
};