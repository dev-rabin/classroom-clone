const db = require('../connection');

const classcontroller = {
    createClass: (req, res) => {
        const { className, userId, classDesc } = req.body;
        console.log(req.body);
        const query = 'insert into class (className,userId,classDesc ) values (?,?,?)';
        db.query(query, [className, userId,classDesc ], (error, result) => {
            if (error) {
                res.json({ message: error });
                console.log(error)
            } else {
                res.json({ message: 'Class has been created :', id: result.insertId });
            }
        })
    },

    getCreatedClassData: (req, res) => {
        const userId  = req.body; // Destructure parameters
        console.log("getCreatedClassData : body ",req.body) ;
        console.log("getCreatedClassData : userId ",userId) ;
        const query = "select * from class where userId = ?";
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ message: error });
            }
            if (result.length === 0) {
                return res.status(200).json({ success: false, message: `class not found for userId: ${userId}`, data : []});
            }
            const createdClasses = result;
            console.log("User class data:", createdClasses);
            res.json({ success:true, data : createdClasses});
        });
    },
    
    getAllClass : (req,res) => {
        // const classTable = req.body;
        const query = "select * from class";
        db.query(query,(error, result) => {
            if (error) {
                return res.json({message : error});
            }
            else {
                return res.json({message : result});
            }
        })  
    }
    
}
module.exports = classcontroller;