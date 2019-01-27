const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cuhackit"
  database: "cuhackit"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//start setting up webserver
const app = express();

//decode request body using json
app.use(bodyParser.json());

app.post('/lot_info', (req,res)=>{
        console.log("in POST /lot_info");
        // Accepts JSON body { "lot_id": int, "num_cars": int}
        var lot_id = req.body.lot_id;
	var num_cars = req.body.num_cars;

        if( !lot_id || !num_cars) {
                console.log("problem with the lot_info fields");
                return res.sendStatus(400);
        }

	// Look up the lot_id in the database
	var sql = "SELECT TotalSpaces FROM Lots WHERE Lot_ID = " + lot_id + ";";
	var calculation = -num_cars;
	con.query(sql, function (err, result) {
		if (err) {
			throw err;
			return res.sendStatus(404);
		}
		console.log("Lot " + lot_id + " Record found with " + result.TotalSpaces + "spaces.");
		calculation += result.TotalSpaces;
	});

	console.log("The calculation is " + calculation);
	
	// Insert the information into the database: Lot_ID and Total_Spaces_Avail
	if (calculation < 0) {
		calculation = 0;
	}
	var sql2 = "INSERT INTO Lot_Records (Lot_ID, Total_Spaces_Avail, Time_Stamp) VALUES (" + lot_id + ", " + calculation + ", Now());";
	con.query(sql2, function (err, result) {
		if (err) {
			throw err;
			return res.sendStatus(400);
		}
		console.log("1 record inserted");
	});

	return res.sendStatus(200);
});

/*app.get('/lot_space', (req,res)=>{
	console.log("in GET /lot_space");
	
	var lot_id = req.body.lot_id;

	if( !lot_id ) {
		console.log("problem with the lot_space fields");
		return res.sendStatus(400);
	}

	// Look up the lot_id in the database
	var sql = "SELECT Total_Spaces_Avail
});*/

let port = 3000;
app.listen(port, function () {
	console.log('Listening on port '+port+'!');
});
