const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

console.log('Current directory in userController:', __dirname);
console.log('Attempting to require User model from:', path.join(__dirname, '..', 'models', 'User.js'));
console.log('User.js exists:', fs.existsSync(path.join(__dirname, '..', 'models', 'User.js')));

let User;
try {
  User = require('../models/User');
  console.log('User model loaded successfully');
} catch (error) {
  console.error('Error loading User model:', error);
  throw new Error('Failed to load User model');
}

exports.signup = async (req, res) => {
  console.log('Signup request body:', req.body);

  try {
    const { fullName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    console.log('User saved to database:', user);
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.updateJoinOption = async (req, res) => {
  try {
    const { userId, joinOption } = req.body;
    const user = await User.findByIdAndUpdate(userId, { joinOption }, { new: true });
    res.json({ message: 'Join option updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating join option', error: error.message });
  }
};

exports.updateSkills = async (req, res) => {
  try {
    const { userId, skills, skillType } = req.body;
    const updateField = skillType === 'learner' ? { learnerSkills: skills } : { guruSkills: skills };
    const user = await User.findByIdAndUpdate(userId, updateField, { new: true });
    res.json({ message: 'Skills updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating skills', error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { userId, countryCode, phoneNumber } = req.body;
    const user = await User.findByIdAndUpdate(userId, { countryCode, phoneNumber }, { new: true });
    res.json({ message: 'Contact details updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact details', error: error.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const { userId } = req.body;
    const defaults = {
      joinOption: 'Learner',
      learnerSkills: [],
      guruSkills: []
    };
    const user = await User.findByIdAndUpdate(userId, { 
      joinOption: defaults.joinOption,
      learnerSkills: defaults.learnerSkills,
      guruSkills: defaults.guruSkills
    }, { new: true });
    res.json({ message: 'edited successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error editing details', error: error.message });
  }
};

exports.updateToggleStatus = async (req, res) => {
  try {
    const { userId, toggleStatus } = req.body;
    const user = await User.findByIdAndUpdate(userId, { toggleStatus }, { new: true });
    res.json({ message: 'Toggle status updated successfully', toggleStatus: user.toggleStatus });
  } catch (error) {
    res.status(500).json({ message: 'Error updating toggle status', error: error.message });
  }
};

exports.saveQuestion = async (req, res) => {
  try {
    const { userId, question, questionType } = req.body;
    const user = await User.findByIdAndUpdate(userId, { question, questionType }, { new: true });
    res.json({ message: 'Question saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error saving question', error: error.message });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ toggleStatus: user.toggleStatus, question: user.question, questionType: user.questionType });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};