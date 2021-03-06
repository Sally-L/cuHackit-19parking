const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cuhackit",
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

	console.log("input lot_id is: " + lot_id);
	console.log("input num_cars is: " + num_cars);
	if( !lot_id || !num_cars) {
                console.log("problem with the lot_info fields");
                return res.sendStatus(400);
        }

	// Look up the lot_id in the database
	var sql = "INSERT INTO Lot_Records (Lot_ID, Total_Spaces_Avail, Time_Stamp) VALUES (" + lot_id + ", (SELECT TotalSpaces from Lots Where Lot_ID = " + lot_id + ") - " + num_cars + "  , NOW() );";
	console.log("About to query the sql!");	
	con.query(sql, function (err, result) {
		if (err) {
			console.log("Error in the sql?");
			throw err;
			return res.sendStatus(404);
		}
		console.log("Lot " + lot_id + " Record found with spaces.");
	});
	/*var calculation = -num_cars + result.TotalSpaces;
	console.log("The calculation is " + calculation);
	
	// Insert the information into the database: Lot_ID and Total_Spaces_Avail
	if (calculation < 0) {
		calculation = 0;
	}*/

	return res.sendStatus(200);
});

app.get('/lot_space', (req,res)=>{
	console.log("in GET /lot_space");
	
	var lot_id = req.query.lot_id;
	console.log("The lot id is " + lot_id);

	if( !lot_id ) {
		console.log("problem with the lot_space fields");
		return res.sendStatus(400);
	}

	// Look up the lot_id in the database
	var sql = "SELECT Total_Spaces_Avail FROM Lot_Records WHERE Lot_ID = " + lot_id + " ORDER BY Record_ID DESC LIMIT 1;";
	con.query(sql, function (err, result) {
		if (err) {
			throw err;
			return res.sendStatus(404);
		}
		console.log("Lot " + lot_id + " Record found with " + result[0].Total_Spaces_Avail + " spaces.");
		var space_avail = result[0].Total_Spaces_Avail;
		if (space_avail < 0) {
			space_avail = 0;
		}
		return res.status(200).json({"space_avail": space_avail});
	});
});

let port = 3000;
app.listen(port, function () {
	console.log('Listening on port '+port+'!');
});
