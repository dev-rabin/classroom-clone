const db = require('../connection');

const teacherController = {
    createTeacher : (req,res) => {
        const {teacher_name,email,password} = req.body;
        console.log(req.body);
        const query = 'insert into teacher (teacher_name,email,password) values (?,?,?)';
        db.query(query,[teacher_name,email,password], (error, result) => {
            if(error){
                res.json({message : error});
            } else{
                res.json({message : "Teacher has been registered"});
                console.log(res.json);
            }
        })
    }
}
module.exports = teacherController