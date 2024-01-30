require('dotenv').config();
const secretKey = process.env.REACT_JWT_KEY1;
const jwt = require('jsonwebtoken');

function userToken (userId,userName) {
    const payload = {
        userId : userId,
        userName :userName
    }
    const options = {
        expiresIn : "30D"
    }
    return jwt.sign(payload,secretKey,options);
}

module.exports = userToken;