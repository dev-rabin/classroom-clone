const db = require("../connection");
const userToken = require("../middleware/userToken");
const jwt = require('jsonwebtoken')

const Usercontroller = {
  //Create user
  createUser: (req, res) => {
    const { name, email, password, rollNo } = req.body;
    const query =
      "INSERT INTO user (name, email, password, rollNo) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, password, rollNo], (error, result) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          res.status(401).json({
            message: "Email & Roll No. are already existed",
            success: false,
          });
        } else {
          res.status(500).json({ message: error.message, success: false });
          throw error;
        }
      } else {
        const userId = result.insertId;
        const token = userToken(userId);
        const decodedToken = jwt.decode(token);
        console.log("Decoded Token on Student:", decodedToken); // Retrieve the inserted ID
        res.json({
          success: true,
          message: "Student registered successfully",
          id: userId,
          token: token,
        });
        console.log("user Created", userId, token);
      }
    });
  },

  //Login user
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const loginQuery = "SELECT * FROM user WHERE email=?";
    try {
      db.query(loginQuery, [email], (error, rows) => {
        if (error) {
          console.log("Error during login", error);
          return res
            .status(500)
            .json({ error: "Internal server error", success: false });
        }
        if (rows.length === 0) {
          // User not found
          return res
            .status(401)
            .json({ error: "Invalid credentials", success: false });
        }
        const user = rows[0];
        if (user.password !== password) {
          // Invalid password
          return res
            .status(401)
            .json({ error: "Invalid credentials", success: false });
        }
        // Successful login
        const token = userToken(user);
        const decodedToken = jwt.decode(token);
        console.log("Decoded Token on Client:", decodedToken);
        res.json({
          success: true,
          message: "Login successful",
          data: user,
          token: token,
        });
        console.log("Login user", token);
      });
    } catch (error) {
      console.error("Unexpected error during login", error);
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  },
  //  Get user by token
  getUserByToken: (req, res) => {
    const userId = req.userId;
    console.log("userId:", userId);
    const query = "SELECT * FROM user WHERE userId= ?;";
   try {
    db.query(query, [userId], (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "user not found" });
      }
      const userData =  result[0];
      console.log("Get user :", userData);
      res.json({userData});
    });
   } catch (error) {
    return res.status(500).json({ message: "Get no user" });
   }
  },
};
module.exports = Usercontroller;
