const express = require('express');
const userRouter = express.Router();
const db = require('../connection');
const Usercontroller = require('../controllers/user_controller');


userRouter.get('/getUsers',Usercontroller.getUsers);
userRouter.get('/:id', Usercontroller.getUserById);

module.exports = userRouter;