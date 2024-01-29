const db = require("../connection");
const teacherToken = require("../middleware/teacherToken");
const jwt = require("jsonwebtoken");

const teacherController = {
  createTeacher: (req, res) => {
    const { name, email, password } = req.body;
    const query = "insert into teacher (name,email,password) values (?,?,?)";
    db.query(query, [name, email, password], (error, result) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(401).json({ success: false, message: "Email already registered" });
        } else {
          return res.status(500).json({ message: error.message, success: false });
        }
      } else {
        const teacherId = result.insertId;
        const token = teacherToken(teacherId); 
        const decodedToken = jwt.decode(token);
        console.log("Decoded Token on teacher:", decodedToken); 
        res.json({ 
           success: true,
           message: "Teacher has been registered",
           id: teacherId,
           token: token
        });
        console.log("teacher Created", teacherId, token);
      }
    });
  },
  loginTeacher: async (req, res) => {
    const { email, password } = req.body;
    const loginQuery = "SELECT * FROM teacher WHERE email=?";
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
        const teacher = rows[0];
        if (teacher.password !== password) {
          // Invalid password
          return res
            .status(401)
            .json({ error: "Invalid credentials", success: false });
        }
        // Successful login
        const token = teacherToken(teacher);
        const decodedToken = jwt.decode(token);
        console.log("Decoded Token on Client:", decodedToken);
        res.json({
          success: true,
          message: "Login successful",
          data: teacher,
          token: token,
        });
        console.log("Login Teacher", token);
      });
    } catch (error) {
      console.error("Unexpected error during login", error);
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  },
  getTeacherByToken : (req, res)=>{
    const teacherId = req.teacherId;
    console.log("TeacherId : ",teacherId);
    const query = "SELECT * FROM teacher WHERE teacherId= ?;";
    try {
        db.query(query,[teacherId],(error,result)=>{
            if (error) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: "Teacher not found"});
            }
            const teacherData = result[0];
            console.log("Got Teacher :" ,teacherData);
            res.json(teacherData);
        });
    } catch (error) {
        return res.status(500).json({ message: "Teacher not found" });
    }
  }
};
module.exports = teacherController;
