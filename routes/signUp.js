const express = require('express');
const signUpController = require('../controllers/signUp_controller');
const router = express.Router();

router.get('/add-user',signUpController.sign);

module.exports=router;