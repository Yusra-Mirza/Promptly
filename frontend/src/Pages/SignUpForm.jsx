import "./SignUpForm.css";
import {useState} from "react";
export default function SignUpForm(){
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    return(
        
        <div className="auth-form">
            <div className="form-group">
                <label>Name<span className="required-star">*</span></label>
                <input type="text" placeholder="Enter your Name" required/>
            </div>
            <div className="form-group">
                <label>Email Address <span className="required-star">*</span></label>
                <input type="email" placeholder="Enter Your Email Address" required/>
            </div>
            <div className="form-group">
                <label>Password <span className="required-star">*</span></label>
                <div className="password-input-wrapper">
                    <input type={showPassword ? "text" : "password"} placeholder="Enter Password" required/>
                    <button type="button" className="show-hide-btn" onClick={()=>setShowPassword(!(showPassword))}>
                        {showPassword?"hide":"show"}
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label>Confirm Password <span className="required-star">*</span></label>
                <div className="password-input-wrapper">
                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Enter Password" required/>
                    <button type="button" className="show-hide-btn" onClick={()=>setShowConfirmPassword(!(showConfirmPassword ))}>
                        {showConfirmPassword ?"hide":"show"}
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label>Upload Your Picture</label>
                <input type="file" accept="image/*" className="file-input"/>
            </div>
            <button className="submit-btn signup-submit-btn">SignUp</button>
        </div>
       
    );
};