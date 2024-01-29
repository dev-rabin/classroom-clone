const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.REACT_JWT_KEY1;

const verifyTokenStudent = (req, res, next) => {
  const token = req.headers.authorization;
  const jwtToken = token ? token.replace(" ", "").trim() : null;
  console.log("Token:", token);
  console.log("JWT Token:", jwtToken);// Corrected token extraction

  if (!jwtToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(jwtToken, secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("Decoded Token:", decoded);
    if (!decoded.studentId) {
      return res
        .status(401)
        .json({ message: "Invalid token - studentId missing" });
    }
    req.studentId = decoded.studentId;
    console.log("jwt studentId:", decoded.studentId);
    next();
  });
};
module.exports = verifyTokenStudent;
