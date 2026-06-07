import "./SignUpForm.css";
import {useState} from "react";
import axios from "axios";
export default function SignUpForm(){
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const [pic,setPic]=useState();
    const [picLoading,setPicLoading]=useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const postDetails = (pics) => {
    if (!pics) return;

  const data = new FormData();
  data.append("file", pics);
  data.append("upload_preset", "chat-app"); 
  data.append("cloud_name", "dxkvcyjnl");     

  fetch("https://api.cloudinary.com/v1_1/dxkvcyjnl/image/upload", { 
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((fileData) => {
      setPic(fileData.secure_url.toString()); 
      console.log("--- CLOUDINARY UPLOAD SUCCESS ---");
      console.log("Your Image Link is:", fileData.secure_url);
      setPicLoading(false);
    })
    .catch((err) => {
      console.log("Cloudinary Upload Error:", err);
      setPicLoading(false);
    });
};
    //Added the backend submit function right here
    const submitHandler = async () => {
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all required fields!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // Sending data + the image link to your backend folder
            const { data } = await axios.post(
                "/api/user",
                { name, email, password, pic },
                config
            );

            console.log("Registration Successful!", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            alert("Signup Successful!");
        } catch (error) {
            console.log("Error during registration:", error.response.data.message);
            alert(error.response.data.message || "Something went wrong!");
        }
    };
    return(
        
        <div className="auth-form">
            <div className="form-group">
                <label>Name<span className="required-star">*</span></label>
                <input 
    type="text" 
    placeholder="Enter your Name" 
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
/>
            </div>
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
                    <button type="button" className="show-hide-btn" onClick={()=>setShowPassword(!(showPassword))}>
                        {showPassword?"hide":"show"}
                    </button>
                </div>
            </div>
            
                <div className="form-group">
    <label>Confirm Password <span className="required-star">*</span></label>
    <div className="password-input-wrapper">
        <input 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />
        <button type="button" className="show-hide-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "hide" : "show"}
        </button>
    </div>
</div>
            <button 
    className="submit-btn signup-submit-btn" 
    onClick={submitHandler}
    disabled={picLoading}
>
    {picLoading ? "Uploading Image..." : "SignUp"}
</button>
        </div>
       
    );
};