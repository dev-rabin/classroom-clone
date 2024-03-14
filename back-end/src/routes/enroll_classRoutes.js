const express = require('express');
const enrollRouter = express.Router();
const enrollClassController = require('../controllers/enroll_class');

enrollRouter.post('/enrollmentClass', enrollClassController.classEnrollment);
enrollRouter.post('/classenrolled', enrollClassController.classesEnrolled);
enrollRouter.get('/classenrolledByStudent', enrollClassController.getClassesByStudentId);

module.exports = enrollRouter;