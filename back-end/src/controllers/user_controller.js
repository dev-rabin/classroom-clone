const db = require('../connection');

const Usercontroller = {
    //Get all users
    getUsers: async (req, res) => {
        db.query('select * from users', (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json(result);
            }
        });
    },
    //Get user by id
    getUserById: async (req, res) => {
        const { id } = req.params;
        db.query('select * from user where id=?', [id], (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json(result[0]);
            }
        });
    },
    //Create user
    createUser: (req, res) => {
        const { user_type, name, email, password, roll_no } = req.body;  // Change from req.params to req.body
        console.log("Robin MAndhotia  " + JSON.stringify(req.body));
        const query = 'INSERT INTO users (user_type,name,email,password,roll_no) VALUES (?,?,?,?,?)'
        db.query(query, [user_type, name, email, password, roll_no], (error, result) => {
            if (error) {
                res.json({ message: error });
                throw error;
            } else {
                res.json({ message: 'User added successfully', id: result.insertId });
            }
        });
    },
    //Login User
    loginUser :(req, res) =>{
        const {email, password} = req.body;
        const loginQuery = 'select * from users where email=? & password=?';
        db.query(loginQuery, [email,password], (error, result) => {
            if (error) {
                console.log('Error in Login',error);
                res.json({message:error})
                return;
            } else{
             res.json({message:'You are logged in', id:result.insertId});
            }
        })
    }
    }
module.exports = Usercontroller;