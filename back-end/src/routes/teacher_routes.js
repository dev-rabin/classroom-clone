const express = require('express');
const teacherRouter = express.Router();
const teacherController = require('../controllers/teacher_controller');

teacherRouter.post('/registerTeacher', teacherController.createTeacher);

module.exports = teacherRouter;