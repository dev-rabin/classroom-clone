require('dotenv').config();
const secretKey = process.env.REACT_JWT_KEY1;
const jwt = require('jsonwebtoken');

function studentToken (student) {
    const payload = {
        studentId : student.studentId,
        studentName : student.name
    }
    const options = {
        expiresIn : "30D"
    }
    return jwt.sign(payload,secretKey,options);
}

module.exports = studentToken;