import React, { useState } from 'react'
import { userRegisterUrl } from '../api_url';
import axios from 'axios';
import "./UserRegister.css";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userHandler = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(userRegisterUrl, {name, email, password});
      console.log("response", response)
      if(response.status === 201){
        alert("User Registration successfully")
      }
    }catch(error){
      alert(error.response?.data?.message)
    }

  }
  return (
    <div className="registerPage">
      <form onSubmit={userHandler} className="registerForm">
        <h2>Create Your Account</h2>
                <p className="registerSubtitle">
                    Join Opinion Hub and share your opinions
                </p>

        <div className='registerField'>
          <label>Username</label>
          <input 
              type="text"
              placeholder="Enter your username"
              value={name}
              onChange={(e)=> setName(e.target.value)} required />
          </div>

        <div className='registerField'>
          <label>Email</label>
          <input 
              type="email"
              placeholder="Enter your email"
              value={email} 
              onChange={(e)=> setEmail(e.target.value)} required />
        </div>
        
        <div className='registerField'>
          <label>Password</label>
          <input 
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)} 
              required
              minLength={8}
              />
          <button type="submit" className="registerButton">
            Create Account
          </button>
        </div>
        </form>
    </div>
  )
}

export default UserRegister
