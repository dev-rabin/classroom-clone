const express = require('express');
const {AssignmentController,uploads} = require('../controllers/asssignment_controller');
const assignmentRouter = express.Router();

assignmentRouter.post('/createassignment' ,uploads.single("fileAttach"), AssignmentController.createAssignment);
assignmentRouter.get("/assignments/:classId",AssignmentController.getAssignmentsByClassId);

module.exports = assignmentRouter;