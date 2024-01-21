const express = require('express');
const enrollRouter = express.Router();
const enrollClassController = require('../controllers/enroll_class');

enrollRouter.post('/joinclass', enrollClassController.studentEnrollment);

module.exports = enrollRouter;