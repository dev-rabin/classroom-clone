const db = require("../connection");
const jwt = require("jsonwebtoken");

const classcontroller = {
  createClass: (req, res) => {
    const { className, teacherId, classDesc } = req.body;
    console.log(req.body);
    const query =
      "insert into class (className,teacherId,classDesc ) values (?,?,?)";
    db.query(query, [className, teacherId, classDesc], (error, result) => {
      if (error) {
        res.json({ message: error });
        console.log(error);
      } else {
        res.json({ message: "Class has been created :", id: result.insertId });
      }
    });
  },

  getCreatedClassData: (req, res) => {
    const { teacherId } = req.body;
    if (!teacherId) {
      return res
        .status(400)
        .json({ success: false, message: "teacher ID is required" });
    }
    const query = "SELECT * FROM class WHERE teacherId = ?";
    db.query(query, [teacherId], (error, result) => {
      if (error) {
        console.error("Database error:", error);
        return res
          .status(500)
          .json({ success: false, message: "Database error", error });
      }
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No classes found for this teacher",
          data: [],
        });
      }
      const createdClasses = result;
      console.log("User class data:", createdClasses);
      res.json({ success: true, data: createdClasses });
    });
  },
  getAllClass: (req, res) => {
    const query = "select * from class";
    db.query(query, (error, result) => {
      if (error) {
        return res.json({ message: error });
      } else {
        return res.json({ message: result });
      }
    });
  },
  
    getTeachingClasses : (req, res) =>{
        const payload = jwt.decode(req.headers.authorization);
        const teacherId = payload.userId;
        const query = "select * from class where teacherId = ?";
        db.query(query,teacherId,(error,result)=>{
          if (error) {
            console.error("get teaching classes error : ", error);
            res.json({success : false , message : error});
            return;
          } else {
            if (result.length === 0) {
              console.error("error : No teaching classes for this teacher");
              res.json({success : false , message : "No teaching classes for this teacher"});
              return;
            }
            else{
              const teachingClassData = result;
              console.log("You are teaching with these classes", teachingClassData);
              res.json({success : true, message : "You are teaching with these classes", data : result});
              return;
            }
          }
        })
    }
};
module.exports = classcontroller;
