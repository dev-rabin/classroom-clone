const express = require('express');
const classRouter = express.Router();
const classcontroller = require('../controllers/class_controller');


classRouter.post('/createClass' , classcontroller.createClass);
classRouter.get("/getAllClass" , classcontroller.getAllClass);
classRouter.get("/teachingClasses", classcontroller.getTeachingClasses);
classRouter.get("/class/:classId", classcontroller.getClassById)


module.exports = classRouter;