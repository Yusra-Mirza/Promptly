import jwt from "jsonwebtoken";
import config from "./config.js";
const generateToken=(id)=>{
    return jwt.sign({id},config.JWT_SECRET,{
        expiresIn:"1d",
    });

    
};
export default generateToken;