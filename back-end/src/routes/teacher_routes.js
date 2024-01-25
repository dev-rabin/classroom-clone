const express = require('express');
const teacherRouter = express.Router();
const teacherController = require('../controllers/teacher_controller');
const verifyTokenTeacher = require('../middleware/verifyTokenTeacher');

teacherRouter.post('/registerteacher', teacherController.createTeacher);
teacherRouter.get('/teacher',verifyTokenTeacher,teacherController.getTeacherByToken )

module.exports = teacherRouter;