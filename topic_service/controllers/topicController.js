const Topic = require("../models/Topic");

exports.createTopic = async(req, res) => {
    const {title, desc} = req.body;
    try{
        const record = await Topic.create(
            {title, desc}
        )
        return res.status(201).json({message: "Topic created success", record})
    }catch (error){
        console.error(error.message)
        return res.status(201).json({message: "Something went wrong"})
    }
}

exports.getTopic = async (req, res)=> {
    try {
        const result = await Topic.find()
        return res.status(201).json({message: "success", result})
    } catch (error){
        return res.status(201).json({message: "Something went wrong"})
    }
}

exports.getTopicById = async(req, res)=> {
    try {
        const {id} = req.params;
        const record = await Topic.findById(id);
        if(!record){
            return res.status(404).json({message: "Topic not found"})
        }
        return res.status(201).json({message: "success", record})
    }catch (error){
        console.error(error.message)
        return res.status(201).json({message: "Something went wrong"})
    }
}