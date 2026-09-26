const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    login: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_creator: {
        type: Boolean,
        default: false
    }, 
    hashed_refresh_token: {
        type: String,
        default: ""
    }
});

const Admin = model("Admin", adminSchema);

module.exports = { Admin };