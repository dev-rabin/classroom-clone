const crypto = require('crypto');
const secretKey = crypto.randomBytes(16).toString('hex');
console.log(secretKey);
const jwt = require('jsonwebtoken');

function generateToken (student) {
    const payload = {
        studentId : student.userId,
        studentName : student.name
    }
    const options = {
        expiresIn : "30D"
    }
    return jwt.sign(payload,secretKey,options);
}

module.exports = generateToken;