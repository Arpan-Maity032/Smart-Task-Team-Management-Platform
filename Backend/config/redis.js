import { createClient } from 'redis';

const redisClient = createClient({
    username: 'default',
    password: process.env.password,
    socket: {
        host: 'redis-18859.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18859
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

module.exports = redisClient;

