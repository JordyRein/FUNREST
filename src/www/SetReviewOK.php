<?php
include "SQLConnection.php";
include "JWTManager.php";

//ini_set("display_errors", "1");

$env = parse_ini_file(dirname(__FILE__,3)."/.env");

header("Content-Type: application/json");

if(!(isset($_POST["Token"]))){
  header($_SERVER["SERVER_PROTOCOL"] . " 401 Unauthorized");
  exit(1);
}

$jwtManager = new JWTManager($env["SECRET_KEY"]);

if(!$jwtManager->validateToken($_POST["Token"])){
  header($_SERVER["SERVER_PROTOCOL"] . " 403 Unauthenticated");
  exit(1);
}

$role = json_decode($jwtManager->decodeToken($_POST["Token"]))->Role;
if($role!="Admin"){
  header($_SERVER["SERVER_PROTOCOL"] . " 403 Unauthenticated");
  exit(1);
}


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
echo json_encode("ok");

?>
