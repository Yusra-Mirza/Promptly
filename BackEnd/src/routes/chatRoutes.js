import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();
import { accessChat,fetchChats
    
 } from "../controllers/chatControllers.js";
router.post("/",protect,accessChat);
router.get("/",protect,fetchChats);
// router.post("/group",protect,createGroupChat);
// router.put("/rename", protect, renameGroupChat);
// router.put("/groupremove",protect,removeFromGroup);
// router.put("/groupadd",protect,addToGroup); 

export default router;