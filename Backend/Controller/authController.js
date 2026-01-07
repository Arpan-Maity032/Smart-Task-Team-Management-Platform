const User = require('../models/User');
const { redisClient, connectRedis } = require('../config/redis');
const generateToken = require('../utils/generateToken');



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
        await redisClien.del(`sess:${req.user._id}`);
        res.status(200).json({message:'Successfully logged out'});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};