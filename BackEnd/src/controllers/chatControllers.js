import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

import Chat from "../Models/chatModel.js"
const accessChat=asyncHandler(async(req,res)=>{
    const {userId}=req.body;
    if(!userID){
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    let isChat= await chats.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ],
    }).populate("users","-password").populate("latestMessage");
});
