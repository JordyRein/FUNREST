<?php

function ConnectMySQL(){
  $env= parse_ini_file(dirname(__FILE__,3)."/.env");

  $conn = new mysqli($env["HOST"], $env["FUN_USER"], $env["DBPASS"], $env["DBNAME"]);

  if ($conn->connect_error){
    die ("Connection Failed ".$conn->connect_error);
  }

  return $conn;
}

function CloseMySQL($conn){
  $conn->close();
}

?>
