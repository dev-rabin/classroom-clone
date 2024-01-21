const db = require('../connection');

const classcontroller = {
    createClass : (req, res)=> {
        const {class_name,teacher_id,} = req.body;
        console.log(req.body);
        const query = 'insert into class (class_name,teacher_id) values (?,?)';
        db.query(query,[class_name,teacher_id], (error, result) => {
            if (error) {
                res.json({message : error});
                console.log(error)
            } else {
                res.json({message : 'Class has been created :', id: result.insertId });
            }
        })
    },
}
module.exports = classcontroller;