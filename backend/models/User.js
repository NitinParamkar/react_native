const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        min: 3,
        max: 30,
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    userType: {
      type: String,
      enum: ["student", "mentor", "both"],
      default: "student"
    },
    skillSet: [
      {
        type: String,
      }
    ],
    isAvaliable: {
      type: Boolean,
      default: false
    }
    
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;