const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.put('/join-option', userController.updateJoinOption);
router.put('/skills', userController.updateSkills);
router.put('/contact', userController.updateContact);
router.put('/edit', userController.edit);

module.exports = router;