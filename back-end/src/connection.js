const mysql = require("mysql2"); 

//Mysql Connection
const db = mysql.createConnection({ 
	host: "localhost", 
	user: "root", 
	password: 'Robin@123',
    database: "classroomClone"
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