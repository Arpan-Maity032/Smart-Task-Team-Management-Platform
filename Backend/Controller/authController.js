const User = require('../models/User');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_ACCESS_SECRET,{expiresIn:'30d'});
};

exports.loginUser = async (req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        const token = generateToken(user._id);

        await redisClient.set(`sess:${user._id}`,token,{EX:2592000});

        res.json({
            _id:user._id,
            name:user.name,
            token:token
        });
    }
    else{
        res.status(401).json({message:'Invalid email or password'});
    }
};