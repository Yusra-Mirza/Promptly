 import express from "express";
 import { sendMessage } from "../controllers/messageControllers.js";
 import { allMessages } from "../controllers/messageControllers.js";
 const router=express();
import { protect } from "../middleware/authMiddleware.js";
 //for sending message
 router.post("/",protect,sendMessage);

//for fetching all msg of a chat
router.get("/:chatId",protect,allMessages);

export default router;
