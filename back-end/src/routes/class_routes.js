const express = require('express');
const classRouter = express.Router();
const classcontroller = require('../controllers/class_controller');


classRouter.post('/createClass' , classcontroller.createClass);

module.exports = classRouter