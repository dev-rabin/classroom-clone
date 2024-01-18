const mysql = require("mysql"); 

//Mysql Connection
const db = mysql.createConnection({ 
	host: "localhost", 
	user: "root", 
	password: '',
    database: "classroom_clone"
}); 

//Database connection
db.connect((err) => { 
	if (err) { 
	console.log("Database Connection Failed !!!", err); 
	} else { 
	console.log("connected to Database"); 
	} 
}); 

module.exports = db;