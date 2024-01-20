const express = require('express');
const userRouter = express.Router();
const Usercontroller = require('../controllers/user_controller');


userRouter.get('/getUsers',Usercontroller.getUsers);
userRouter.get('/:id', Usercontroller.getUserById);
userRouter.post('/createAccount', Usercontroller.createUser);
userRouter.post('/login', Usercontroller.loginUser);

module.exports = userRouter;