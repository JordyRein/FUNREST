<?php

include "SQLConnection.php";
include "Mitarbeiter.php";
include "JWTManager.php";

ini_set("display_errors", "1");

header("Content-Type: application/json");


$env = parse_ini_file(dirname(__FILE__,3)."/.env");

if(isset($_POST["username"]) and $_POST["password"]){

  $jwtManager = new JWTManager($env["SECRET_KEY"]);

  $conn=ConnectMySQL();

  if(!$conn instanceof mysqli){
    header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
    echo json_encode("login err connection fault");
    exit(1);
  }

  $query= "call mssp_CheckAdminLogin('".$_POST["username"]."','".$_POST["password"]."')";
  $res = $conn->query($query);

  if ($res->num_rows!=1){
    header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
    echo json_encode("login err id/pass wrong");
  }
  $row=$res->fetch_assoc();
  $ma = new Mitarbeiter($row['Id'],$row['Vorname'], $row['Nachname'], $row['Rolle']);

  CloseMySQL($conn);

  header($_SERVER["SERVER_PROTOCOL"] . " 200 Success");
  //echo json_encode($ma);
  echo json_encode($jwtManager->createToken(json_encode($ma)));
}


?>
