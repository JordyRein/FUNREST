<?php
include "SQLConnection.php";

//ini_set("display_errors", "1");

header("Content-Type: application/json");

if(!(isset($_POST["BewertungId"]) and 
  isset($_POST["MitarbeiterId"]) and 
  isset($_POST["Value"]))){
  header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
  exit(1);
}

$conn=ConnectMySQL();
if(!$conn instanceof mysqli){
  header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
  echo json_encode("Something went wrong with database connection\n");
  exit(1);
}

$query= "call mssp_SetReviewOK(".$_POST["Value"].",".$_POST["BewertungId"].",".$_POST["MitarbeiterId"].")";
$res = $conn->query($query);

CloseMySQL($conn);

header($_SERVER["SERVER_PROTOCOL"] . " 200 Success");
echo "ok";

?>
