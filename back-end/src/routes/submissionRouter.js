const express = require('express');
const submissionRouter = express.Router();
const submissionController = require('../controllers/submit_assignment_controller');

submissionRouter.post('/submit', submissionController.submitAssignment);

module.exports = submissionRouter;