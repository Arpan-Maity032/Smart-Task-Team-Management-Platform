const Task = require('../models/Task');
const Activity = require('../models/Activity');

exports.getTasks = async(req,res) =>{
    try{
        const {projectId} = req.query;

        const tasks = await Task.find({project: projectId})
            .populate('assignee','name avatar_url')
            .sort('createdAt');

            res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message:'Error Fetching tasks',error: error.message});
    }
};

exports.createTask = async(req,res)=>{
    try{
        const { title,project,assignee,priority,dueDate} = req.body;

        const task = await Task.create({
            title,
            project,
            assignee,
            priority,
            dueDate
        });

        const activity = await Activity.create({
            user: req.user._id,
            project: project,
            task: task._id,
            action:'created_task',
            details:`created task: ${title}`
        });

        // Broadcast to all user in project room
        req.io.to(project.toString()).emit('activityUpdate',activity);

        res.status(201).json(task);
    }catch(error){
        res.status(400).json({message:'task creation failed',error:error.message});
    }
};

exports.updateTaskStatus = async(req,res)=>{
    const {taskId} = req.params;
    const {status} = req.body;

    const task = await Task.findByIdAndUpdate(taskId,{status},{new:true});
    if(task){
        const activity = await Activity.create({
            user: req.user._id,
            action: `moved task to ${status}`,
            task:taskId,
            project:task.project
        });

        //real time update to precific project

        req.io.to(task.project.toString()).emit('activityUpdate',{
            userName:req.user.name,
            action:activity.action,
            taskTitle:task.title,
            timestamp:activity.createdAt
        });
        res.json(task);
    }
};

exports.deleteTask = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({message:'Task not found'});
        }

        await task.deleteOne();

        await Activity.create({
            user:req.user._id,
            project:task.project,
            action:'deleted_task',
            details:`deleted task:${task.title}`
        });

        req.io.to(task.project.toString()).emit('taskDeleted',req.params.id);
        res.status(200).json({message:'Task remove'});
    }catch(error){
        res.status(500).json({message:'Deletion failed',error:error.message});
    }
};