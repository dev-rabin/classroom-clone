const db = require("../connection");
const jwt = require("jsonwebtoken");
const generateToken = require("../middleware/generateToken");
const { json } = require("body-parser");

const Usercontroller = {
  //Create user
  createAccount: (req, res) => {
    const { name, email, password } = req.body; 
    const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, password], (error, result) => {
      if (error) {
        console.error("Error creating user:", error); 
        res.status(500).json({ message: "Error creating user", success: false }); 
      } if (result.code === 'ERR_DUP_ENTRY') {
        res.json({message : "Email already registred"});
      }
      else {
        console.log("User created successfully:", result);
        const token = generateToken(result.userId, result.userName); 
        console.log("User token generated :" ,token);
        res.json({
          success: true,
          message: `User created successfully!`,
          token : token
        });
      }
    });
  },
  
  //Login user
  userLogin : (req, res) => {
    const {email,password} = req.body;
    const query = "select * from user where email = ?";
    db.query(query , [email,password], (error, result) => {
      if (error) {
        console.error(error);
        res.json({message : error})
      } if (result.length === 0) {
        res.json({message : "User not found"});
      }
      else {
        const userData = result[0];
        const token = generateToken(userData.userId,userData.name);
        console.log("Login Result 1 :", result);
        console.log("Login Result 2 :", result[0]);
        console.log("User Login Token :",token);
        res.json({success: true, message : "User Logged in successfully !" , token : token})
      }
    })
  },

  //  Get user by token
  getUserByToken : (req, res) => {
    const payload = jwt.decode(req.headers.authorization) ;
    const userId = payload.userId;
    console.log("getUserByToken  : userId :", userId);
    const query = "select * from user where userId = ?";
    db.query(query , [userId], (error,result)=>{
      if (error) {
        console.error(error);
        res.json({success : false ,message : error})
      }
      if (result.length === 0) {
        res.json({message : "User not found"});
      }
      else {
       const userData = result[0];
        res.json({
          success : true,
          message : "User Data get",
          userData : userData
        })
      }
    })
  },

  getUserById: (req, res) => {
    const userId = req.body.userId; // Assuming userId is passed as a route parameter
    const query = "SELECT * FROM user WHERE userId = ?";
    db.query(query, [userId], (error, result) => {
        if (error) {
            console.error("Error fetching user by ID:", error);
            return res.status(500).json({ success: false, message: "Error fetching user by ID" });
        } else {
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            return res.json({ success: true, message: result });
        }
    });
},

};

module.exports = Usercontroller;
