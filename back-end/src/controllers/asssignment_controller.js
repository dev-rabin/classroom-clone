const db = require("../connection");

const AssignmentController = {
    createAssignment : (req,res) => {
        const {classId, title, description, dueDate} = req.body
        const query = "insert into assignment (classId, title, description, dueDate) values (?,?,?,?)";
        db.query(query,[classId,title,description,dueDate], (error, result) => {
            if(error){
                console.error(error);
                res.json({message : error});
            } else {
                res.json({message : "Assignment creatted",result});
                console.log(result);
            }
        })
    }
}
module.exports = AssignmentController;