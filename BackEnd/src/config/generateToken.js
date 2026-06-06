import jwt from "jsonwebtoken";
import config from "./config.js";
const generateToken=(id)=>{
    const accessToken=jwt.sign({id},config.JWT_SECRET,{
        expiresIn:"1d",
    });
    const refreshToken = jwt.sign({id}, config.JWT_SECRET, {
      expiresIn: "7d",
    });
    return {accessToken,refreshToken};
};
export default generateToken;