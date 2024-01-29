require('dotenv').config();
const secretKey = process.env.REACT_JWT_KEY1;
const jwt = require('jsonwebtoken');

function teacherToken(teacherId, teacherName) {
    const payload = {
        teacherId: teacherId,
        teacherName: teacherName
    }
    const options = {
        expiresIn: "30d" // Corrected expiration format
    }
    return jwt.sign(payload, secretKey, options);
}
module.exports = teacherToken;
