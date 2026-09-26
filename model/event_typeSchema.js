const { Schema, model } = require("mongoose");

const eventTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        parent_event_type_id: {
            type: Schema.Types.ObjectId,
            ref: "EventType",
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("EventType", eventTypeSchema);