const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try{

        const adminRecord = await Admin.findOne({ email });
        if(adminRecord){
            return res.status(401).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: "Admin registered successfully" });
    }catch (error){
        res.status(500).json({ message: "Error registering admin" });
    }
}

exports.adminLogin = async(req, res) => {
    const {email, password} = req.body;
    try{
        const record = await Admin.findOne({email});
        if(!record){
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, record.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign(
            {adminId: record._id}, process.env.JWT_SECRET,
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