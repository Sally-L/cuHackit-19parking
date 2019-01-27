const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "cuhackit",
  password: "cuhackit"
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
        let {lot_id,num_cars} = req.body;

        if( !lot_id || !total_spaces_avail) {
                console.log("problem with the lot_info fields");
                return res.sendStatus(400);
        }

	// Look up the lot_id in the database
	var sql = "SELECT TotalSpaces FROM Lots WHERE Lot_ID = " + lot_id + ";";
	var calculation = -num_cars;
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Lot " + lot_id + " Record found with " + result.TotalSpaces + "spaces.");
		calculation += result.TotalSpaces;
	});

	console.log("The calculation is " + calculation);
	
	// Insert the information into the database: Lot_ID and Total_Spaces_Avail
	if (calculation < 0) {
		calculation = 0;
	}
	var sql2 = "INSERT INTO Lot_Records (Lot_ID, Total_Spaces_Avail, Time_Stamp) VALUES (" + lot_id + ", " + calculation + ", " + Now() + ");";
	con.query(sql2, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});	

	return res.sendStatus(200);
});

