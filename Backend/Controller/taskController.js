const Task = require('../models/Task');
const Activity = require('../models/Activity');

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