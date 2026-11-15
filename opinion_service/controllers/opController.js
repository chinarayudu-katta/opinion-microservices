const Opinion = require('../models/Opinion');


exports.createOp = async(req, res) => {
    try{
    const {topicId, userName, message} = req.body;
    const userId = req.user.userId;

    const record = await Opinion.create({
        topicId,
        userId,
        userName,
        message
    })
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