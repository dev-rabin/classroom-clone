const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.REACT_JWT_KEY2;

const verifyTokenTeacher = (req, res, next) => {
    const token = req.headers.authorization;
    const jwtToken = token ? token.replace(" ", "").trim() : null;
    console.log("Token:", token);
    console.log("JWT Token:", jwtToken);

    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
     jwt.verify(jwtToken , secretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
        console.log("Teacher decoded token :", decoded);
        if (!decoded.teacherId) {
            return res
            .status(401)
            .json({ message: "Invalid token - teacherId missing" });
        }
        req.teacherId = decoded.teacherId;
        console.log("jwt teacherId : ", decoded.teacherId);
        next();
     }) 
}
module.exports = verifyTokenTeacher;