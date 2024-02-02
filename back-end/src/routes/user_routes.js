const express = require('express');
const userRouter = express.Router();
const Usercontroller = require('../controllers/user_controller');
const verifyToken = require("../middleware/verifyToken");

userRouter.post('/createAccount', Usercontroller.createAccount);
userRouter.post('/login', Usercontroller.userLogin);
userRouter.get('/user',verifyToken, Usercontroller.getUserByToken);
userRouter.get("/userId", Usercontroller.getUserById);

module.exports = userRouter;