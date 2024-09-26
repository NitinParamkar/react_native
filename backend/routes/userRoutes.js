const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/join-option', userController.updateJoinOption);
router.put('/skills', userController.updateSkills);
router.put('/contact', userController.updateContact);
router.put('/edit', userController.edit);
router.put('/toggle-status', userController.updateToggleStatus);
router.put('/save-question', userController.saveQuestion);
router.get('/user-data/:userId', userController.getUserData);

module.exports = router;