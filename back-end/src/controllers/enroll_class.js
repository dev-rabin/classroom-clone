const db = require('../connection')

const EnrollClassController = {

    studentEnrollment : (req, res) => {
        const {userId, classId} = req.body
        console.log(req.body);
        const query = "insert into classenrollment (userId, classId) values (?,?)";
        db.query(query, [userId, classId], (error, result) => {
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