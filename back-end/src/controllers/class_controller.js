const db = require('../connection');

const classcontroller = {
    createClass : (req, res)=> {
        const {className,userId,} = req.body;
        console.log(req.body);
        const query = 'insert into class (className,userId) values (?,?)';
        db.query(query,[className,userId], (error, result) => {
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