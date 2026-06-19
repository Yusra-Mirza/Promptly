import "./SignUpForm.css"; // Reusing your existing form styles
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../context/chatProvider";
import { useToast } from "@chakra-ui/react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history=useHistory();
    const {setUser}=ChatState();
    const toast = useToast();

    const submitHandler = async () => {
        if (!email || !password) {
            toast({
                title: "Please fill in all required fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
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
            setUser(data);
            setLoading(false);
            toast({
                title: "Login Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            history.push("/chats");
        } catch (error) {
           const errorMessage = error.response?.data?.message || "Something went wrong. Please try again!"
            toast({
                title: "Error Occurred!",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
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