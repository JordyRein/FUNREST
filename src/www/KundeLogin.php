<?php

include "SQLConnection.php";
include "Customer.php";

ini_set("display_errors", "1");

header("Content-Type: application/json");

if(isset($_POST["username"]) and $_POST["password"]){
  $conn=ConnectMySQL();

  if(!$conn instanceof mysqli){
    echo json_encode("login err connection fault");
    exit(1);
  }

  $query= "call mssp_CheckKundeLogin('".$_POST["username"]."','".$_POST["password"]."')";
  $res = $conn->query($query);

  if ($res->num_rows!=1){
    echo json_encode("login err id/pass wrong");
  }
  $row=$res->fetch_assoc();
  $ma = new Customer(
    $row['Id'],
    $row['Vorname'], 
    $row['Nachname'],
    $row['Strasse_Nummer'], 
    $row['PLZ'], 
    $row['Stadt'], 
    $row['Geschlecht'], 
    $row['Geburstdatum'], 
    $row['Stammgast'], 
);

  CloseMySQL($conn);
  
  echo json_encode($ma);
}


?>
