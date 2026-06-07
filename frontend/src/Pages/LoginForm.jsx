import "./SignUpForm.css"; // Reusing your existing form styles
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        if (!email || !password) {
            alert("Please fill in all required fields!");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // Sending the credentials to your backend login endpoint
            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            console.log("Login Successful!", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            alert("Login Successful!");
            
            // TODO: Redirect user to the chat page here next!
        } catch (error) {
            console.log("Error during login:", error.response.data.message);
            alert(error.response.data.message || "Invalid Email or Password!");
            setLoading(false);
        }
    };

    return (
        <div className="auth-form">
            <div className="form-group">
                <label>Email Address <span className="required-star">*</span></label>
                <input 
                    type="email" 
                    placeholder="Enter Your Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </div>

            <div className="form-group">
                <label>Password <span className="required-star">*</span></label>
                <div className="password-input-wrapper">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="button" className="show-hide-btn" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "hide" : "show"}
                    </button>
                </div>
            </div>

            <button 
                className="submit-btn login-submit-btn" 
                onClick={submitHandler}
                disabled={loading}
            >
                {loading ? "Logging In..." : "Login"}
            </button>
        </div>
    );
}