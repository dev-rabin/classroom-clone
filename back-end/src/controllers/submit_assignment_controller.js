const db = require("../connection");

const SubmitAssignmentController = {
    submitAssignment : (req,res) => {
        const {assignmentId, userId, submissionTime, fileURL } = req.body;
        console.log(req.body);
        const query = 'insert into submission (assignmentId, userId, submissionTime, fileURL ) values (?,?,?,?)';
        db.query(query,[assignmentId, userId, submissionTime, fileURL ], (error, result) => {
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