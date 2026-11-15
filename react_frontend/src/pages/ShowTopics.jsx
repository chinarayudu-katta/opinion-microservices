import React, { useEffect, useState } from 'react'
import { showTopicUrl } from '../api_url';
import { Link } from 'react-router-dom';
import axios from "axios"
import "./ShowTopics.css";


const ShowTopics = () => {
    const [topics, setTopics] = useState([]);

    const topicHandler = async () => {
        try{
            const response = await axios.get(showTopicUrl)
            setTopics(response.data.result)
            console.log("Checking response: ", topics)
        }catch (error){

        }
    }
    useEffect(()=> {
    topicHandler()
    }, [])
  return (
    <div className='topicSection'>
      {topics.map((item)=> {
        return (
          <div className='topicRecord' key={item.id}>
            <h2>{item.title}</h2>
            <hr />
            <p>{item.desc}</p>
            <div className='seeOps'>
              <Link to="/user/login">
              <button>Post your opinion</button>
              </Link>
              <Link>
              <button>Sell all opinion</button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ShowTopics
