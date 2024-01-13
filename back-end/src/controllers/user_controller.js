
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
        const { name, email } = req.body;  // Change from req.params to req.body
        console.log("Robin MAndhotia  " + JSON.stringify(req.body));
        
        db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (error, result) => {
            if (error) {
                res.json({ message: error });
                throw error;
            } else {
                res.json({ message: 'User added successfully', id: result.insertId });
            }
        });
    }
    
    // createUser : async (req, res) => {
    //     const { name, email } = req.body;
    //     db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    //       if (err) throw err;
    //       res.json({ message: 'User added successfully', id: result.insertId });
    //     });
    //   }
}

module.exports = Usercontroller;