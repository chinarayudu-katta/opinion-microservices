import React, { useState } from 'react'
import { showTopicUrl } from '../api_url';
import axios from "axios"

const ShowTopics = () => {
    const [topics, setTopics] = useState([]);
    
    const topicHandler = async() => {
        try{
            const response = await axios.get(showTopicUrl)
            console.log("Checking response: ", response)
        }catch (error){

        }
    }
    topicHandler()
  return (
    <div>
      <h2>Show  Topics</h2>
    </div>
  )
}

export default ShowTopics
