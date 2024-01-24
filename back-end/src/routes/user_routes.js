const express = require('express');
const userRouter = express.Router();
const Usercontroller = require('../controllers/user_controller');
// const verifyToken = require("../middleware/verifyToken")

userRouter.get('/getUsers',Usercontroller.getUsers);
userRouter.post('/createAccount', Usercontroller.createUser);
userRouter.post('/login', Usercontroller.loginStudent);
userRouter.get('/student', Usercontroller.getUserByToken);

module.exports = userRouter;