import React, { useState } from 'react'
import { userLoginUrl } from '../api_url';
import axios from 'axios';
import "./UserLogin.css";
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userHandler = async(e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const response = await axios.post(userLoginUrl, 
        {
          email, password
        }
      );
      
      if(response.status === 201){
        localStorage.setItem("user_token", response.data.token)
        localStorage.setItem("userName", response.data.record.name)
        localStorage.setItem("userId", response.data.record._id)

        window.dispatchEvent(new Event("authChange"));

        alert("Login successfully");
        navigate("/")
      }
    }catch(error){
      alert(error.response?.data?.message)
    }finally{
      setLoading(false)
    }

  }
  return (
    <div className="loginPage">
      <div className="loginCard">
        <div className="loginHeader">
                    <h1>Welcome Back!</h1>
                    <p>Login to your Opinion Hub account</p>
        </div>
      <form onSubmit={userHandler} className="loginForm">
        <div className="loginField">
          <label htmlFor='email'>Email</label>
          <input
              id="email" 
              type="email"
              placeholder="Enter your email"
              value={email} 
              onChange={(e)=> setEmail(e.target.value)}
              required
              />
        </div>

        <div className="loginField">
          <label htmlFor="password">Password</label>
          <input
              id="password" 
              type="password"
              placeholder="Enter your password"
              value={password} 
              onChange={(e)=> setPassword(e.target.value)}
              required
              />
          </div>
          <button type="submit" className="loginButton" disabled={loading}>{loading ? "Logging in..." : "User Login"}</button>
        </form>

        <div className="registerPrompt">
                    <p>Don't have an account?</p>
                    <Link to="/user/register" className="registerLink">
                        Create Account
                    </Link>
              </div>

                <Link to="/" className="backHome">
                    Back to Home
                </Link>

        </div>
    </div>
  )
}

export default UserLogin
