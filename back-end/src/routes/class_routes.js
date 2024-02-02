const express = require('express');
const classRouter = express.Router();
const classcontroller = require('../controllers/class_controller');


classRouter.post('/createClass' , classcontroller.createClass);
classRouter.get("/classes", classcontroller.getClassData);
classRouter.get("/getallclass" , classcontroller.getAllClass);


module.exports = classRouter;