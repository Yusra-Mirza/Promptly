import React from 'react'
import {chakra, container} from "@chakra-ui/react"
import {Box} from "@chakra-ui/react"    
import {useState} from 'react'
import "./Homepage.css";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
const Homepage = () => {
  // store active tab
  const [activeTab,setActiveTab]=useState("login");

  return(
   <div className="homepage-container">
    <div className="brand-header-box">
      <h1 className="brand-title">Promptly</h1>
    </div>
    <div className="auth-card">
      <div className="tab-switcher">
        <button className={`tab-btn ${activeTab==='login' ? 'active':' '}`} onClick={()=> setActiveTab('login')}>
          Login
        </button>
        <button className={`tab-btn ${activeTab==='signup' ? 'active':' '}`} onClick={()=> setActiveTab('signup')}>
          Sign Up
        </button>
      </div>
      {/* Render only currently selected form  */}
      <div className="form-container">
        {activeTab==='login'? <LoginForm/> :<SignUpForm/>}
      </div>
    </div>
   </div>
  );
}

export default Homepage
