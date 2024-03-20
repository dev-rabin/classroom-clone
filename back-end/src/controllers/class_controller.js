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
    });},
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
  getTeachingClasses: (req, res) => {
    const payload = jwt.decode(req.headers.authorization);
    const teacherId = payload.userId;
    const query = "select * from class where teacherId = ?";
    db.query(query, teacherId, (error, result) => {
      if (error) {
        console.error("get teaching classes error : ", error);
        res.json({ success: false, message: error });
        return;
      } else {
        if (result.length === 0) {
          console.error("error : No teaching classes for this teacher");
          res.json({
            success: false,
            message: "No teaching classes for this teacher",
          });
          return;
        } else {
          const teachingClassData = result;
          console.log("You are teaching with these classes", teachingClassData);
          res.json({
            success: true,
            message: "You are teaching with these classes",
            data: result,
          });
          return;
        }
      }
    });
  },
  getClassById : (req, res)=>{
    const classId = req.params.classId;
    const query = "select * from class where classId = ?";
    db.query(query,classId,(error,result)=>{
      if (error) {
        console.error("Error during fetching by ClassId ", error);
        return res.json({success:false, message: message.error});
      }else{
        console.log("Class data by ClassId : ", result);
        return res.json({success:true, message:"Class data fetched successfully", data: result})
      }
    })
  },
  getAllEnrolledStudentsByClassId : (req, res) => {
    const classId = req.params.classId;
    const query = "SELECT enrollmentId,studentId,classId,name,email FROM classroom_clone.classenroll inner join user on classenroll.studentId = user.userId where classId = ?;"
    db.query(query,classId,(error,result)=>{
      if (error) {
        console.error("getAllEnrolledStudentsByClassId error : ",error.message);
        return res.json({success:false, message: error.message});
      }else{
        console.log("getAllEnrolledStudentsByClassId result : ", result);
        return res.json({success:true,message:"Your students fetched succesfully", data: result})
      }
    })
  }
};
module.exports = classcontroller;
