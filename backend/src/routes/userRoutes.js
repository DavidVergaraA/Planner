const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/me', UserController.getProfile);

module.exports = router;
