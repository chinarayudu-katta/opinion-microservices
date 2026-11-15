import React, { useState } from 'react'
import { userRegisterUrl } from '../api_url';
import axios from 'axios';

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
    <div>
      <form onSubmit={userHandler}>
        <div className=''>
          <h3>Username</h3>
          <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
          <h3>Email</h3>
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <h3>Password</h3>
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
          <button type="submit">User Register</button>
        </div>
        </form>
    </div>
  )
}

export default UserRegister
