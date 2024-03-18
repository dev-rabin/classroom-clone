const db = require("../connection");
const multer = require("multer");
const moment = require("moment");

const fileConfiq = multer.diskStorage({
    destination : (req,file,callBack) => {
        callBack(null,"./uploads");
    },
    file : (req,file,callBack) => {
        callBack(null,`file-${Date.now()}.${file.originalName}`)
    }
});

const uploads = multer({
    storage : fileConfiq
});

const AssignmentController = {
    createAssignment : (req,res) => {
        const {classId, title, description, dueDate} = req.body;
        const fileAttach = req.file ? req.file.path : null;
        const query = "insert into assignment (classId, title, description, dueDate,fileAttach) values (?,?,?,?,?)";
        db.query(query,[classId,title,description,dueDate,fileAttach], (error, result) => {
            if(error){
                console.error(error);
                res.json({message : error});
            } else {
                res.json({message : "Assignment creatted",result});
                console.log(result);
            }
        });
    },
    getAssignmentsByClassId : (req, res) => {
        const classId = req.params.classId;
        const query = "select * from assignment where classId = ?";
        db.query(query,classId,(error,result)=>{
            if (error) {
                console.error("getAssignmentByClassId error : ", error);
                return res.json({success : false, message : error.message});
            } else {
                console.log("getAssignmentByClassId result", result);
                return res.json({success:true, message:"Your assignments fetched!", data: result})
            }
        })
    }
}
module.exports = {AssignmentController,uploads};