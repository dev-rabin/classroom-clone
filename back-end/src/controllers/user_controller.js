const db = require('../connection');

const Usercontroller = {
    //Get all users
    getUsers : async (req,res)=>{
       db.query('select * from users', (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json(result);
            }
        });
    },
    //Get user by id
    getUserById : async (req, res) =>{
        const {id} = req.params;
        db.query('select * from user where id=?',[id], (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json(result[0]);
            }
        });
    },
    //Create user
    createUser:(req, res) => {
        const { user_type,name, email,password,roll_no } = req.body;  // Change from req.params to req.body
        console.log("Robin MAndhotia  " + JSON.stringify(req.body));
        db.query('INSERT INTO users (user_type,name,email,password,roll_no) VALUES (?,?,?,?,?)', [user_type,name, email,password,roll_no ], (error, result) => {
            if (error) {
                res.json({ message: error });
                throw error;
            } else {
                res.json({ message: 'User added successfully', id: result.insertId });
            }
        });
    }
}
module.exports = Usercontroller;