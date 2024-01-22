const db = require('../connection');

const teacherController = {
    createTeacher : (req,res) => {
        const {name,email,password} = req.body;
        console.log(req.body);
        const query = 'insert into teacher (name,email,password) values (?,?,?)';
        db.query(query,[name,email,password], (error, result) => {
            if(error){
                res.json({message : error});
            } else{
                res.json({message : "Teacher has been registered", data: result});
                console.log(res.json);
            }
        });
    }
}
module.exports = teacherController