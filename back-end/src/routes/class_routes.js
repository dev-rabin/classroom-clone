const express = require('express');
const classRouter = express.Router();
const classcontroller = require('../controllers/class_controller');


classRouter.post('/createClass' , classcontroller.createClass);
classRouter.post("/myCreatedClasses", classcontroller.getCreatedClassData);
classRouter.get("/getAllClass" , classcontroller.getAllClass);


module.exports = classRouter;