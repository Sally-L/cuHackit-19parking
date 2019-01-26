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
        let {
                lot_id,
                total_spaces_avail,
        } = req.body;

        if( !lot_id || !total_spaces_avail) {
                console.log("problem with the lot_info fields");
                return res.sendStatus(400);
        }

	// Look up the lot_id in the database
	var sql = "SELECT TotalSpaces FROM Lots WHERE Lot_ID = " + lot_id + ";";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Lot " + lot_id + " Record found with " + result.TotalSpaces + "spaces.");
		
	}

	 

}
