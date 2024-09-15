const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  joinOption: {
    type: String,
    enum: ['Learner', 'Guru', 'Both'],
    default: 'Learner'
  },
  learnerSkills: [String],
  guruSkills: [String],
  countryCode: String,
  phoneNumber: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);