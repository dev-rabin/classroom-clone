const express = require('express');
const assignmentController = require('../controllers/asssignment_controller');
const assignmentRouter = express.Router();

assignmentRouter.post('/createassignment' , assignmentController.createAssignment);

module.exports = assignmentRouter;