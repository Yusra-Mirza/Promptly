import "./LoginForm.css";
export default function LoginForm(){
    return(
        <div className="auth-form">
            <div className="form-group">
                <label>Email Address </label>
                <input type="email" placeholder="Enter Your Email Address"/>
           </div>
           <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter Password"/>               
           </div>
           {/* Action Buttons */}
           <button className="submit-btn login-btn">login</button>
           <button className="submit-btn guest-btn">
            Get Guest User Credentials
           </button>
        </div>
    );
};