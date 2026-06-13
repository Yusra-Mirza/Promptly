import jwt from "jsonwebtoken";
import User from "../Models/userModel.js"
import asyncHandler from "express-async-handler";
import config from "../config/config.js";


const protect=asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
             token=req.headers.authorization.split(" ")[1]; 
             const decoded=jwt.verify(token,config.JWT_SECRET);
             req.user=await User.findById(decoded.id || decoded._id).select("-password");
             return next();        
        }catch(error){
            res.status(401);
           throw new Error("Not authorized, access token failed or expired");
        }

    }
    if(!(token)){
        res.status(401);
        throw new Error("Not authorized, no access token found");
    }

});

export {protect};