// routes/chatRoutes.js
const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

// Route to fetch all chat messages
router.get("/", async (req, res) => {
    try {
        const chats = await Chat.find().sort({ timestamp: 1 });  // Sort by timestamp
        res.json(chats);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

module.exports = router;
