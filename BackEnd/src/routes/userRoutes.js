import express from "express";
import {registerUser,authUser} from "../controllers/userControllers.js";
// import authUser from "../controllers/userControllers.js";
const router=express.Router();
router.post("/login", authUser);
router.post("/register",registerUser);

export default router;