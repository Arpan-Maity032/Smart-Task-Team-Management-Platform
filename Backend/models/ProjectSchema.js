const mongoose = required("mongoose");

const ProjectSchema = mongoose.Schema({
    name : { type: String, required: true },
    description : String,
    owner: { type:mongoose.Schema.Types.ObjectId, ref:'User'},
    members: [
        {
            user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
            role:{type:String,enum:['admin','editor','viewer'],default:'viewer'}
        }
    ],
    status:{type:String,default:'active'}

},{timestamps:true});

module.exports = ProjectSchema;