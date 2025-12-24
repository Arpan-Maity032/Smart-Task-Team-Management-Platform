const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  action: { 
    type: String, 
    required: true,
    enum: ['created_task', 'updated_status', 'added_comment', 'deleted_task']
  },
  details: { type: String }, // e.g., "Changed status from To Do to In Progress"
}, { timestamps: true });

// Automatically delete logs older than 30 days to keep DB lean
ActivitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('Activity', ActivitySchema);