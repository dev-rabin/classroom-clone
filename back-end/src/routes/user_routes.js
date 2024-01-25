const express = require('express');
const userRouter = express.Router();
const Usercontroller = require('../controllers/user_controller');
const verifyTokenStudent = require("../middleware/verifyTokenStudent")

userRouter.get('/getUsers',Usercontroller.getUsers);
userRouter.post('/createAccount', Usercontroller.createUser);
userRouter.post('/login', Usercontroller.loginStudent);
userRouter.get('/student',verifyTokenStudent, Usercontroller.getStudentByToken);

module.exports = userRouter;