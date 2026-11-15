import React from 'react'
import ShowTopics from './pages/ShowTopics'
import {Routes, Route} from "react-router-dom";
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import IndTopic from './pages/IndTopic';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
    <Routes>
      <Route path="/" element={<ShowTopics />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/single/topic/:id" element={<IndTopic />} />
    </Routes>      
    </div>
  )
}

export default App
