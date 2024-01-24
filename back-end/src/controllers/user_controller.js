const db = require("../connection");
const generateToken = require("./jwt");

const Usercontroller = {
  //Get all users
  getUsers: async (req, res) => {
    db.query("select * from student", (error, result) => {
      if (error) {
        throw error;
      } else {
        res.json(result);
      }
    });
  },
 
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
        const token = generateToken(studentId); // Retrieve the inserted ID
        res.json({
          success: true,
          message: "Student added successfully",
          id: studentId,
          token: token
        });
        console.log(studentId,token);
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

        const user = rows[0];
        if (user.password !== password) {
          // Invalid password
          return res
            .status(401)
            .json({ error: "Invalid credentials", success: false });
        }

        // Successful login
        const token = generateToken(user);
        res.json({
          success: true,
          message: "Login successful",
          data: user,
          token,
        });
        console.log(token);
      });
    } catch (error) {
      console.error("Unexpected error during login", error);
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  },
   //Get students by token
  //  getUserByToken: async (req, res) => {
  //   const studentId = req.studentId;
  //   const query = 'SELECT * FROM student WHERE studentId = ?';
  //   db.query(query,[studentId], (error,result)=>{
  //     if (error) {
  //       return res.status(500).json({ message: 'Internal Server Error' });
  //     }
  //     if (result.length === 0) {
  //       return res.status(404).json({ message: 'student not found' });
  //     }
  //     const studentData = result[0];
  //     res.json({student : studentData});
  //   });
  // },
};
module.exports = Usercontroller;
