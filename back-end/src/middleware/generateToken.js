const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.REACT_JWT_KEY1;

function generateToken(userId, name) {
    const payload = {
        userId: userId,
        name: name
    };
    console.log("payload user id : ",payload.userId);
    console.log("Generate payload :",payload);
    const options = {
        expiresIn: "30d"
    };
    return jwt.sign(payload, secretKey, options); // Return the generated token
}
module.exports = generateToken;

