import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import generateToken from "../config/generateToken.js";
const registerUser=asyncHandler(async(req,res)=>{
    console.log("Request hit the register route");
    const {name,email,password,pic}=req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }
    const isAlreadyRegistered=await User.findOne({
        
        email,
    });
    if(isAlreadyRegistered){
        res.status(403);
        throw new Error("User already exists");

    }

    const user=await User.create({
        name,
        email,
        password,
        pic,
    });

    
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        });
    }
    else{
        throw new Error("Failed to create User");
    }
});

export default registerUser;



