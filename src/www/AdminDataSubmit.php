<?php
include "SQLConnection.php";

//ini_set("display_errors", "1");

header("Content-Type: application/json");

if(isset($_GET["search"])){
  switch($_GET["search"]){
    case "Kunde":
      $ip = json_decode(file_get_contents("php://input"));
      
      if(!isset($ip)){
        echo json_encode("error no Id");
        exit(1);
      }

      $conn=ConnectMySQL();
      if(!$conn instanceof mysqli){
        echo json_encode("Something went wrong with database connection\n");
        break;
      }

      $query=";";
      if($ip->Code == "E"){
      $query = "call mssp_EditKunde(
                $ip->Id, 
                N'$ip->FirstName',
                N'$ip->LastName',
                N'$ip->Address',
                N'$ip->PLZ',
                N'$ip->City',
                N'$ip->Sex',
                N'$ip->Birthdate')";
      }
      if($ip->Code == "A"){
      $query = "call mssp_AddKunde(
                N'$ip->FirstName',
                N'$ip->LastName',
                N'$ip->Address',
                N'$ip->PLZ',
                N'$ip->City',
                N'$ip->Sex',
                N'$ip->Birthdate',
                N'$ip->usr',
                N'$ip->pw')";
      }
      $res = $conn->query($query);

      if($conn->error){
        echo json_encode("Error: $conn->error");
        exit(1);
      }
      
      $row=$res->fetch_assoc();
      /*
      if($row['err']){
        echo json_encode($row['err']);
        exit(1);
      } 
       */
      echo json_encode($row['output']);
      
      break;

    case "Buchung":
      $ip = json_decode(file_get_contents("php://input"));
      
      if(!isset($ip)){
        echo json_encode("error no Id");
        exit(1);
      }

      $conn=ConnectMySQL();
      if(!$conn instanceof mysqli){
        echo json_encode("Something went wrong with database connection\n");
        break;
      }

      $query=";";
      if($ip->Code == "E"){
      //$query = "call mssp_EditBooking(
                //N'$ip->Birthdate')";
      //}
      if($ip->Code == "A"){
      $query = "call mssp_AddBooking(
                $ip->KID,
                N'$ip->Zimmer',
                N'$ip->anreise',
                N'$ip->abreise',
                $ip->MID)";
      }
      $res = $conn->query($query);

      if($conn->error){
        echo json_encode("Error: $conn->error");
        exit(1);
      }
      
      $row=$res->fetch_assoc();
      echo json_encode($row['output']);

      break;

  }
}


?>
