const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        sender: { type: String, required: true },
        message: { type: String, required: true },
        media: { type: String, default: null },
        photoUrl: { type: String, default: null },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
