const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { redisClient, connectRedis } = require('../config/redis');
const generateToken = require('../utils/generateToken');
const generateResetToken = require('../utils/generateToken_resetPassword');
const sendEmail = require("../utils/sendEmail");

// New user registration
exports.registerUser = async (req,res) =>{
    try{
        const {name,email,password} = req.body;
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message:'User already exixts'});
        }

        const user = await User.create({name,email,password});

        if(user){
            res.status(201).json({
                _id: user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            });
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};



// existing user login
exports.loginUser = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");

        if(user && (await user.matchPassword(password))){
            const token = generateToken(user._id);

            await redisClient.set(`sess:${user._id}`,token,{EX:2592000});

            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                avatar:user.avatar_url,
                token:token,
            });
        }
        else{
            res.status(401).json({message:'Invalid email or password'});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};


// user logout

exports.logoutUser = async (req,res) =>{
    try{
        await redisClient.del(`sess:${req.user._id}`);
        res.status(200).json({message:'Successfully logged out'});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

//Forgot Password request

exports.forgotPassword = async (req,res) =>{
    const {email} = req.body;

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.json({message:"If email exits,reset link sent"});
    }
    const resetToken = generateResetToken(user._id.toString(),user.password);

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    sendEmail(user.email,resetLink);
    res.json({message:"Resent link sent"});
};

//verify reset-password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const payload = jwt.decode(token);
        if (!payload || !payload.id) {
            return res.status(400).json({ message: "Invalid token format" });
        }

        const user = await User.findById(payload.id).select('+password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const secret = process.env.JWT_RESET_SECRET + user.password;
        
        const decoded = jwt.verify(token, secret);

        if (decoded.purpose !== "reset_password") {
            return res.status(403).json({ message: "Invalid token" });
        }

        // 3. Update password
        user.password = password; 
        await user.save(); // This changes user.password hash in DB

        return res.json({ message: "Password reset successful" });
    } catch (error) {
        console.log("ERROR NAME:", error.name);     // e.g., JsonWebTokenError
        console.log("ERROR MESSAGE:", error.message); // e.g., invalid signature
        return res.status(400).json({ 
            message: "Token error", 
            dev_info: error.message});
    }
};