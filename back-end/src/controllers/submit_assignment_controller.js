const db = require("../connection");

const SubmitAssignmentController = {
    submitAssignment : (req,res) => {
        const {assignmentId, studentId, submissionTime, fileURL } = req.body;
        console.log(req.body);
        const query = 'insert into submission (assignmentId, studentId, submissionTime, fileURL ) values (?,?,?,?)';
        db.query(query,[assignmentId, studentId, submissionTime, fileURL ], (error, result) => {
            if (error) {
                console.error(error);
                res.json({message : error});
            } else {
                res.json({message: "Assignment has been submitted", result});
                console.log(result);
            }
        })
}}
module.exports = SubmitAssignmentController;