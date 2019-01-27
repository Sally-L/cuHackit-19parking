<html>
<body>
<style>
body{
	background-color: #ff6600;
	color: black;
}
</style>
<br><br><br>
<center><font size = "32"><bold> CUhackit - Parking Rekognition App</bold> </font></center>
<br><br>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript">

		$(document).ready(function(){
			refreshTable();
		});

		function refreshTable(){
			$("#tableHolder").load('getTable.php', function(){
				setTimeout(refreshTable, 3000);
			});
		}
</script>

<!-- This is where the javascript inserts the table -->
<div id="tableHolder"></div>
</body>
</html>