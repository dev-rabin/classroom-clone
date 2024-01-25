require('dotenv').config();
const secretKey = process.env.REACT_JWT_KEY2;
const jwt = require('jsonwebtoken');

function teacherToken(teacher) {
    const payload = {
        teacherId : teacher.teacherId,
        teacherName : teacher.teacherName
    }
    const options = {
        expiresIn : "30D"
    }
    return jwt.sign(payload,secretKey,options);
}
module.exports = teacherToken;