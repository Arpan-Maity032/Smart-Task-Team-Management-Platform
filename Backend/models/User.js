const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String, default: 'https://via.placeholder.com/150' },
  role: { type: String, enum: ['Admin', 'Manager', 'Member'], default: 'Member' }
}, { timestamps: true });

//mactch password
UserSchema.methods.matchPassword = async function(enterPassword){
  return await bcrypt.compare(enterPassword,this.password);
};

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', UserSchema);