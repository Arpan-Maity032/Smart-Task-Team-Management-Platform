require("dotenv").config();
const { createClient } = require("redis");

const redisClient = createClient({
    username: 'default',
    password: process.env.password,
    socket: {
        host: 'redis-18859.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18859
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('✅ Redis connected successfully'));

const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

module.exports = { redisClient, connectRedis };

