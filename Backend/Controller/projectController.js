const Project = require('../models/Project');
const Activity = require('../models/Activity');


exports.createProject = async (req,res)=>{
    try{
        const {name,description} = req.body;

        const project = await Project.create({
            name,
            description,
            owner:req.user._id,
            members:[{user:req.user._id,role:'admin'}] //Creator is admin by default
        });

        await Activity.create({
            user:user._id,
            project:project._id,
            action:'created_project',
            detils:`initiated project:${name}`
        });
        res.status(201).json(project);
    }catch(error){
        res.status(400).json({message:'project creation failed',error:error.message});
    }
};

exports.getProjects = async (req,res)=>{
    try{
        const projects = await Project.find({
            $or:[
                { owner:req.user._id},
                {'members.user':req.user._id}
            ]
        }).populate('owner','name avatar_url');
        res.ststus(200).json(projects);
    }catch(error){
        res.status(500).json({message:'Error fetching Project',error:error.message});
    }
};

exports.addMemberToProject = async (req,res)=>{
    try{
        const {userId,role} = req.body;
        const project = await Project.findById(req.params.id);

        if(!project) res.status(404).json({message:'Project not found'});

        //check if user already a member

        const isMember = await Project.members.some(m => m.user.toString() == userId);
        if(isMember) res.status(400).json({message:'User is already a team member'});

        //if not a user
        project.members.push({user:userId,role:role || 'viewer'});

        await project.save();

        //log this as team activity

        const activity =await Activity.create({
            user:req.user._id,
            project:project._id,
            action:'added_member',
            details:'added a new member to the team'
        });

        req.io.to(project._id.toString()).emit('activityUpdate',activity);
        res.status(200).json(project);

    }catch(error){
        res.status(400).json({message:'Failed to add member',error:error.message});
    }
};