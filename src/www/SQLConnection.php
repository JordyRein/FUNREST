<?php

function ConnectMySQL(){
  $user = "root";
  $host = "localhost";
  $pass = "";
  $dbname = "FUNREST";

  $conn = new mysqli($host, $user, $pass, $dbname);

  if ($conn->connect_error){
    die ("Connection Failed ".$conn->connect_error);
  }

  return $conn;
}

function CloseMySQL($conn){
  $conn->close();
}

?>
