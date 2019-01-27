<?php 

$VCHOST = "localhost";
$VCUSER = "root";
$VCPASS = "cuhackit";
$VCDB = "cuhackit";

$conn = new mysqli($VCHOST, $VCUSER, $VCPASS, $VCDB);

if($conn->connect_errno){
		logger("Connection Failed: " . $conn->connect_error);
		//$this->userMessage("Error: " . $conn->connect_error);
}

$sql = "SELECT Total_Spaces_Avail FROM Lot_Records WHERE Lot_ID = 1 ORDER BY Record_ID DESC LIMIT 1";

$rs = $conn->query($sql);
$row = $rs->fetch_assoc();

$lot_one_count = $row['Total_Spaces_Avail'];

$sql = "SELECT Total_Spaces_Avail FROM Lot_Records WHERE Lot_ID = 2 ORDER BY Record_ID DESC LIMIT 1";

$rs = $conn->query($sql);
$row = $rs->fetch_assoc();

$lot_two_count = $row['Total_Spaces_Avail'];

if($lot_two_count < 0){
	$lot_two_count = 0;
}
if($lot_one_count < 0){
	$lot_one_count = 0;
}

echo "<center><h2> 			CURRENT OCCUPANCY </h2></center>";
echo "<br>";
echo "<center><h2>			C1 : " . $lot_one_count . " out of 6. </h2></center>";
echo "<br>";
echo "<center><h2> 			C2 : " . $lot_two_count . " out of 8. </h2></center>";


?>