// const  jwt = require ("jsonwebtoken");
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(16).toString('hex');

// const verifyToken = (req,res,next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         res.status(401).json({message : "Unauthorized"});
//     }
//     jwt.verify(token,secretKey,(error, decoded) => {
//         if (error) {
//             return res.status(401).json({ message: 'Invalid token' });
//           }
//           req.studentId = decoded.studentId;
//           next();
//     })
// }
// module.exports = verifyToken;