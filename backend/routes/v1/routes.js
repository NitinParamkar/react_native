const express = require('express');
const router = express.Router();

const { register, login, isAuthenticated } = require("../../middlewares/auth");
const { createDoubt, acceptDoubt } = require("../../controllers/doubt-controller");
const { createUser, getUser, findUser, updateUser } = require("../../controllers/user-controller");

router.route('/api/user').get(getUser);
router.route('/api/user').post(createUser);
router.route('/api/user').put(updateUser);

router.route('/api/signup').post(register);
router.route('/api/signin').post(login);

router.route('/api/doubt').post(createDoubt);
router.route('/api/accept-doubt').get(acceptDoubt);

module.exports = router;