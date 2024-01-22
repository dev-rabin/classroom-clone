const db = require('../connection')

const EnrollClassController = {

    studentEnrollment : (req, res) => {
        const {studentId, classId} = req.body
        console.log(req.body);
        const query = "insert into classenrollment (studentId, classId) values (?,?)";
        db.query(query, [studentId, classId], (error, result) => {
            if (error) {
                res.json({message : error});
                console.error(error);
            } else {
                res.json({message : "You are joined className", result});
                console.log(result);
            }
        })
    }

}

module.exports = EnrollClassController;