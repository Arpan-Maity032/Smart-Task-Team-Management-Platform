require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

const connectDB = require('./config/db');
const {connectRedis} = require('./config/redis');

//Route Import
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const server = http.createServer(app);

//initialize Socket.io
const io = new Server(server,{
    cors:{
        origin:process.env.CLIENT_URL || "*",
        methods: ["GET","POST","PUT","DELETE"]
    }
});

//database and Redis Connection
connectDB();
connectRedis();

//Middleware

app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    req.io = io;
    next();
});


//API Routes
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/projects',projectRoutes);

//Base Route for Health Check
app.get('/',(req,res)=>{
    res.send('TaskFlow Smart API is running.....');
});

io.on('connection',(socket)=>{
    console.log('New Client Connection:',socket.id);

    //user join a specific project room
    socket.on('joinProject',(projectId)=>{
        socket.join(projectId);
        console.log(`User joined Project Room:${projectId}`);
    });

    socket.on('disconnect',()=>{
        console.log('Client Disconnected');
    });
});

//start server

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`server started on ${PORT}
        mode: ${process.env.NODE_ENV || 'development'}`);
});
