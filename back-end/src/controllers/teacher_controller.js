const db = require("../connection");
const generateToken = require("../middleware/studentToken");
const jwt = require("jsonwebtoken");

const teacherController = {
  createTeacher: (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    const query = "insert into teacher (name,email,password) values (?,?,?)";
    db.query(query, [name, email, password], (error, result) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          res
            .status(401)
            .json({ success: false, message: "Email already registered" });
        } else {
          res.status(500).json({ message: error.message, success: false });
        }
      } else {
        const teacherId = result.insertId;
        const token = generateToken(teacherId);
        const decodedToken = jwt.decode(token);
        console.log("Teacher ", decodedToken);
        res.json({ 
           success :true,
            message: "Teacher has been registered",
             data: result });
        console.log("Teacher registered", teacherId, token);
      }
    });
  },
  getTeacherByToken : (req, res)=>{
    const teacherId = req.teacherId;
    console.log("TeacherId : ",teacherId);
    const query = "select * from teacher where teacherId = ?;";
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
        })
    } catch (error) {
        return res.status(500).json({ message: "Teacher not found" });
    }
  }
};
module.exports = teacherController;
