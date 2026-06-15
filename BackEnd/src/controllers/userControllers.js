import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import generateToken from "../config/generateToken.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const { JsonWebTokenError } = jwt;
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
    const {accessToken,refreshToken}=generateToken(user._id);
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            accessToken,
        });
    }
    else{
        throw new Error("Failed to create User");
    }
});

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        const {accessToken,refreshToken}=generateToken(user._id);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          accessToken,
        });

    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

});

const refreshAccessToken=asyncHandler(async (req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!(refreshToken)){
        res.status(401);
        throw new Error("Refresh token missing , please log in again");
    }
    try{
        const decoded=jwt.verify(refreshToken,config.JWT_SECRET);
        const user=await User.findById(decoded.id);
        if(!(user)){
            res.status(401);
            throw new Error("User associated with this token no longer exists");
        }
        
        const newAccessToken=jwt.sign(
            {id:user._id},
            config.JWT_SECRET,
            {
                expiresIn:"15m"
            }
        );
        res.status(200).json({
            accessToken:newAccessToken,
        });

    }catch(error){
        res.status(403);
        throw new Error("Invalid or expires refresh token");
    }

});


//api/user?search=yusra
const  allUsers=asyncHandler (async (req,res)=> {
    const keyword=req.query.search ? {
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}},
        ],
    }
    :{};
    const users= await User.find(keyword).find({_id:{$ne: req.user._id}});
     res.send(users);   
});
export {registerUser,authUser,refreshAccessToken,allUsers};


