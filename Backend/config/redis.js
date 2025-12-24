import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: '92LjTi23CtzCD6ZrYrpvhaxflSHIsw7R',
    socket: {
        host: 'redis-18859.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18859
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

module.exports = client;

