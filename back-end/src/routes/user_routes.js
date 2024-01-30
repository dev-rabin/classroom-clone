const express = require('express');
const userRouter = express.Router();
const Usercontroller = require('../controllers/user_controller');
const verifyToken = require("../middleware/verifyToken");

userRouter.post('/createAccount', Usercontroller.createUser);
userRouter.post('/login', Usercontroller.loginUser);
userRouter.get('/user',verifyToken, Usercontroller.getUserByToken);

module.exports = userRouter;