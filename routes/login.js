const express = require('express')
const router = express.Router();
const loginController = require('../controllers/login_controller');

router.get('/login-page', loginController.login);

module.exports=router; 