require('dotenv').config();
const secretKey = process.env.REACT_JWT_KEY1;
const jwt = require('jsonwebtoken');

function studentToken (studentId,studentName) {
    const payload = {
        studentId : studentId,
        studentName :studentName
    }
    const options = {
        expiresIn : "30D"
    }
    return jwt.sign(payload,secretKey,options);
}

module.exports = studentToken;