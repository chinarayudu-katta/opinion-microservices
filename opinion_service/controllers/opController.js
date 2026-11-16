const Opinion = require('../models/Opinion');
const {producer} = require("../config/kafka");

const axios = require("axios");


exports.createOp = async(req, res) => {
    try{
    const {topicId, userName, message} = req.body;
    const userId = req.user.userId;

    await axios.get(`http://localhost:8002/topic/show-topic/${topicId}`);

    const record = await Opinion.create({
        topicId,
        userId,
        userName,
        message
    });

    await producer.send({
        topic: "opinion.created",
        messages: [
            {
                key: String(record._id),
                value: JSON.stringify(record)
            }
        ]
    });

    return res.status(201).json({
        message: "opinion or comment posted",
        data: record
    })
    }catch (error){
        console.log("Create Opinion error", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

exports.getTopicOpinions = async (req, res) => {
    try {
        const { topicId } = req.params;

        const result = await Opinion.find({ topicId })

        return res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
};