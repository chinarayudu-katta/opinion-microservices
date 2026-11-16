import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { postCommUrl } from '../api_url';
import { showCommentUrl } from '../api_url';
import axios from 'axios';
import "./IndTopic.css";

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
    <div className="indTopicPage">
    <div className="indTopicContainer">

      {/* Comments Section */}
      <div className="commentsSection">
        <h2 className="commentsHeading">
          Community Opinions ({showComm.length})
        </h2>

        {showComm.length > 0 ? (
          showComm.map((comment) => (
            <div className="commentCard" key={comment._id}>
              <h3 className="commentUser">{comment.userName}</h3>
              <p className="commentMessage">{comment.message}</p>
            </div>
          ))
        ) : (
          <div className="noComments">
            No opinions yet. Be the first to share your thoughts!
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      <div className="commentFormCard">
        <h2 className="formHeading">Share Your Opinion</h2>

        <form className="commentForm" onSubmit={commHandler}>
          <div className="commentField">
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="commentField">
            <label>Your Opinion</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts..."
              required
            />
          </div>

          <button className="postCommentButton" type="submit">
            Post Comment
          </button>
        </form>
      </div>

    </div>
  </div>
  )
}

export default IndTopic
