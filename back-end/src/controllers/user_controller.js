const db = require("../connection");
const studentToken = require("../middleware/studentToken");
const jwt = require('jsonwebtoken')

const Usercontroller = {
  //Create user
  createUser: (req, res) => {
    const { name, email, password, rollNo } = req.body;
    const query =
      "INSERT INTO student (name, email, password, rollNo) VALUES (?, ?, ?, ?)";
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
        const studentId = result.insertId;
        const token = studentToken(studentId);
        const decodedToken = jwt.decode(token);
        console.log("Decoded Token on Student:", decodedToken); // Retrieve the inserted ID
        res.json({
          success: true,
          message: "Student registered successfully",
          id: studentId,
          token: token,
        });
        console.log("student Created", studentId, token);
      }
    });
  },

  //Login student
  loginStudent: async (req, res) => {
    const { email, password } = req.body;
    const loginQuery = "SELECT * FROM student WHERE email=?";
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
        const student = rows[0];
        if (student.password !== password) {
          // Invalid password
          return res
            .status(401)
            .json({ error: "Invalid credentials", success: false });
        }
        // Successful login
        const token = studentToken(student);
        const decodedToken = jwt.decode(token);
        console.log("Decoded Token on Client:", decodedToken);
        res.json({
          success: true,
          message: "Login successful",
          data: student,
          token: token,
        });
        console.log("Login student", token);
      });
    } catch (error) {
      console.error("Unexpected error during login", error);
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  },
  //  Get student by token
  getStudentByToken: (req, res) => {
    const studentId = req.studentId;
    console.log("StudentId:", studentId);
    const query = "SELECT * FROM student WHERE studentId= ?;";
   try {
    db.query(query, [studentId], (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "student not found" });
      }
      const studentData =  result[0];
      console.log("Get Student :", studentData);
      res.json({studentData});
    });
   } catch (error) {
    return res.status(500).json({ message: "Get no student" });
   }
  },
};
module.exports = Usercontroller;
