import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { postCommUrl } from '../api_url';
import { showCommentUrl } from '../api_url';
import axios from 'axios';

const IndTopic = () => {
    const {id} = useParams();
    const [topicId, setTopicId] = useState(id);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("")
    const [showComm, setShowComm] = useState([]);

    const userToken = localStorage.getItem("user_token")
    
    const commHandler = async(e)=> {
        e.preventDefault();
        try {
            const response = await axios.post(postCommUrl, 
                {topicId, userId, userName, message}, 
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            alert("Opinion Posted Successfully");
            setUserName("");
            setMessage("")
            await topicHandler()
        } catch (error){
            console.log(error.message)
        }
    }

    const topicHandler = async () => {
        try{
            const response = await axios.get(`${showCommentUrl}/${id}`)
            setShowComm(response.data.result)
            
        }catch (error){

        }
    }

    useEffect(()=> {
        topicHandler()
    }, [])
    return (
    <div>
        <div className=''>
        {showComm.map((comment)=> {
            return (
                <div className=''>
                    <h3>{comment.userName}</h3>
                    <div className=''>Title: {comment.message}</div>
                </div>
            )
        })}
        </div>
      <form onSubmit={commHandler}>
        <div className="">
            <h3>username</h3>
            <input type="text" value={userName} onChange={(e)=> setUserName(e.target.value)} />
        </div>

        <div className="">
            <h3>Message</h3>
            <textarea type="text" value={message} onChange={(e)=> setMessage(e.target.value)}></textarea>
        </div>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  )
}

export default IndTopic
