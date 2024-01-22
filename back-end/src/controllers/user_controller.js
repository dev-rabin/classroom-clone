const { createPool } = require('mysql');
const db = require('../connection');


const Usercontroller = {
    //Get all users
    getUsers: async (req, res) => {
        db.query('select * from student', (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json(result);
            }
        });
    },
    //Get students by id
    getUserById: async (req, res) => {
        const { id } = req.params;
        db.query('select * from student where id=?', [id], (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json(result[0]);
            }
        });
    },
    //Create user
    createUser: (req, res) => {
        const { name, email, password, rollNo } = req.body;  // Change from req.params to req.body
        console.log("Robin MAndhotia  " + JSON.stringify(req.body));
        const query = 'INSERT INTO student (name,email,password,rollNo) VALUES (?,?,?,?)'
        db.query(query, [name, email, password, rollNo], (error, result) => {
            if (error) {
                res.json({ message: error });
                throw error;
            } 
            // if (rows.length == 1) {
            //     res.send("You are already registered");
            // }
                res.json({ message: 'User added successfully', data : result });
        });
    },
    //Login User
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        const loginQuery = 'select * from student where email=?';
        try {
            db.query(loginQuery, [email], (error, rows) => {
                if (error) {
                    console.log("Error during login", error);
                    return res.status(500).json({ error: 'Internal server error', success : false });
                }
                if (rows.length === 0) {
                    // User not found
                    return res.status(401).json({ error: 'Invalid credentials' , success : false});
                }
                const user = rows[0];
                if (user.password !== password) {
                    // Invalid password
                    return res.status(401).json({ error: 'Invalid credentials', success : false });
                  }
              
                  // Successful login
                  res.json({success:true, message: 'Login successful',data: user });
            });
        } catch (error) {

        }
    }
}
module.exports = Usercontroller;