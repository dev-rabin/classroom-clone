const mysql = require("mysql"); 

let db = mysql.createConnection({ 
	host: "localhost", 
	user: "root", 
	password: '',
    database: "classroom"
}); 

db.connect((err) => { 
	if (err) { 
	console.log("Database Connection Failed !!!", err); 
	} else { 
	console.log("connected to Database"); 
	} 
}); 

module.exports = db;
