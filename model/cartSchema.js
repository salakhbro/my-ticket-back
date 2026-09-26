const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    fineshedAt: {
      type: Date,
      default: null,
    },

    status_id: {  
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Cart", cartSchema);