import React, { useState } from 'react'
import { userLoginUrl } from '../api_url';
import axios from 'axios';
import "./UserLogin.css";
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userHandler = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(userLoginUrl, {email, password});
      console.log("response", response)
      if(response.status === 201){
        alert("Login successfully");
        navigate("/")
      }
        localStorage.setItem("user_token", response.data.token)
        localStorage.setItem("username", response.data.record.name)
        localStorage.setItem("userId", response.data.record._id)
    }catch(error){
      alert(error.response?.data?.message)
    }

  }
  return (
    <div className="loginPage">
      <form onSubmit={userHandler} className="loginForm">
        <div className="">
        <div className="loginField">
          <h3>Email</h3>
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        </div>

        <div className="loginField">
          <h3>Password</h3>
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
          <button type="submit">User Login</button>
          </div>
        
        </div>
        </form>
    </div>
  )
}

export default UserLogin
