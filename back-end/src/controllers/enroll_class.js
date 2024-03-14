const db = require('../connection');
const jwt = require("jsonwebtoken");

const EnrollClassController = {
    classEnrollment: (req, res) => {
        const { classId, studentId } = req.body;
        if (!classId || !studentId) {
            res.json({ success: false, message: "Missing classId or studentId" });
            console.error("Missing classId or studentId");
            return;
        }
        const enrollmentClass = { classId, studentId };
        const query = "INSERT INTO classenroll SET ?";
        db.query(query, enrollmentClass, (error, result) => {
            if (error) {
                console.error('Error enrolling student: ', error);
                if (error.code === "ER_DUP_ENTRY") {
                    console.log(`Student ${studentId} is already enrolled in class ${classId}`);
                    res.json({ success: false, message: `Student ${studentId} is already enrolled in class ${classId}` });
                } else {
                    res.json({ success: false, error: "Internal server error" });
                }
                return;
            }
            console.log("Class enrollment successful");
            res.json({ success: true, message: "Class enrollment successful" });
        });
    },
    classesEnrolled : (req, res) =>{
        const classId = req.body;
        const query = "select * from classenroll where classId = ?";
        db.query(query, classId, (error,result)=>{
            if (error) {
                console.error("classesEnrolled  error : ", error);
                res.json({success:false, message : "Internal server error"});
                return;
            }
            else if (result.length === 0) {
                console.error("classesEnrolled result found zero : ", result);
                res.json({success:false, message:"No enrolled classes"});
                return;
            }
            else{
                console.log("classesEnrolled result : ", result);
                res.json({success:true, message:"Your enrollments are fecthed successfully",data:result});
                return;
            }
        })
    },
    getClassesByStudentId : (req, res) =>{
       const payload = jwt.decode(req.headers.authorization);
       const studentId = payload.userId;
       const query = "select * from classenroll INNER JOIN class ON classenroll.classId = class.classId;";
       db.query(query,studentId,(error,result)=>{
            if (error) {
                console.error("getClassesByStudentId error : ", error);
                res.json({success : false, message : error});
                return;
            } else {
                if (result.length === 0 ) {
                    console.error("error : No classes for this student");
                    res.json({success : false , message : "No classes for this student"});
                    return;
                }
                else{
                    const studentClasses = result;
                    console.log("You are enrolled with these classes", studentClasses);
                    res.json({success : true, message : "You are enrolled with these classes", data : result});
                    return;
                }
            }
       })
    }
}

module.exports = EnrollClassController;