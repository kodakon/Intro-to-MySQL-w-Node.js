var mysql = require('mysql');

//create connection
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	pass: "",
	database: "nodedb",

});

//make connection
con.connect(function(err){
	if (err) throw err;
	console.log("Connected to the database");

	// Create Database
	con.query("CREATE DATABASE nodedb", function(err, result) {
		if (err) throw err;
		console.log("Database created");
	}); 

	// Create Table
	var sql = "CREATE TABLE customer (id int AUTO_INCREMENT PRIMARY KEY, name varchar(20), email varchar(30))";
	var log = "Table created";
	con.query(sql, function(err, result){
		if (err) throw err;
		console.log(log)
	})

	// Alter Table
	var sql = "ALTER TABLE customer ADD no_telp varchar(20)";
	var log = "Table modified";
	con.query(sql, function(err, result){
		if (err) throw err;
		console.log(log);
	} )

	// Insert Data
	var sql = "INSERT INTO customer (name, email, no_telp) VALUES ('Risky', 'riski@yahoo.com', '081280283')";
	var log = "Data inserted";
	con.query(sql, function(err, result){
		if (err) throw err;
		console.log(log);
	})

	// Insert Multiple Data
	var sql = "INSERT INTO customer (name, email, no_telp) VALUES ?";
	var values = [
		['Adam', 'adam@yahoo.com', '0822212'],
		['Bimo', 'bimo@yahoo.com', '0811121'],
		['Chen', 'ceh@yahoo.com', '0821242'],
	]
	var log = "Records Inserted: ";
	con.query(sql, [values], function(err, result){
		if (err) throw err;
		console.log(log + result.affectedRows);
	});

	// Select Data Loop
	var sql = "SELECT * FROM customer WHERE name LIKE 'r%' OR id = 2";
	var log = "";
	con.query(sql, function(err, result, fields){
		if (err) throw err;
		var i;
		for(i=0;i < result.length; i++){
			console.log(result[i]);
		}	
	});

	//Select Fields to print collumn or database
	var sql = "SELECT * FROM customer";
	var log = "";
	con.query(sql, function(err, result, fields){
		if (err) throw err;
		var i;
	
		console.log(fields[1].name);
		console.log("---------------");
		var i;
		for(i=0;i < result.length; i++){
		console.log(result[i].name);
		}	
			

	// Where clause
	var sql = "SELECT * FROM customer WHERE name LIKE ? OR id = ? ORDER BY email DESC";
	var id = 2;
	var name = 'r%';
	var log = "";
	con.query(sql, [name, id], function(err, result, fields){
		if (err) throw err;
		var i;
		for(i=0;i < result.length; i++){
			console.log(result[i]);
		}		
	});		

	// Delete clause
	var sql = "DELETE FROM customer WHERE id = 4";
	var log = "";
	con.query(sql, function(err, result, fields){
		if (err) throw err;
		console.log("Rows Deleted");	
	});

	// Update clause
	var sql = "UPDATE customer SET name = 'risky f' WHERE id = 1";
	var log = "";
	con.query(sql, function(err, result, fields){
		if (err) throw err;
		console.log(result);	
	});

	// Limit the result
	var sql = "SELECT * FROM customer LIMIT 2";
	var log = "";
	con.query(sql, function(err, result, fields){
		if (err) throw err;
		console.log(result);
	});

	// Drop table
	var sql = "DROP TABLE customer";
	var log = "";
	con.query(sql, function(err, result, fields){
		if (err) throw err;
		console.log(result);
	});

});