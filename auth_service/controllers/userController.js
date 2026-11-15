const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try{

        const userRecord = await User.findOne({ email });
        if(userRecord){
            return res.status(401).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: "User registered successfully" });
    }catch (error){
        res.status(500).json({ message: "Error registering admin" });
    }
}

exports.userLogin = async(req, res) => {
    const {email, password} = req.body;
    try{
        const record = await User.findOne({email});
        if(!record){
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, record.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign(
            {userId: record._id}, process.env.JWT_SECRET,
            {
                expiresIn: "1d",
                issuer: "auth-service",
                audience: "op-share-api"
            }
        )
        return res.status(201).json({message: "admin login success", token})
    }catch (error){
        res.status(500).json({ message: "Something went wrong" });
    }
} 