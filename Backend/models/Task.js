const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    project:{type:mongoose.Schema.Types.ObjectId, ref:'Project',required:true},
    assignee:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:{type:String,required:true},
    status:{
        type:String,
        enum:['To Do','In Progress','Completed'],
        default:'To Do'
    },
    priority:{type:String,enum:['Low','Medium','High']},
    tags:[String],
    subtasks:[{
        title:String,
        isCompleted:{type:Boolean,default:false}
    }],
    dueDate:Date,
},{timestamps:true});

TaskSchema.index({project:1,status:1});

module.exports = mongoose.model(Task,TaskSchema);