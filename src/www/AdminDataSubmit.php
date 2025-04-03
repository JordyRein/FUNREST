<?php
include "SQLConnection.php";

// debugging purpose
//ini_set("display_errors", "1");

header("Content-Type: application/json");

if(isset($_GET["search"])){
  switch($_GET["search"]){
    case "Kunde":

      // Content from JavaScript POST come in php://input
      $ip = json_decode(file_get_contents("php://input"));
      
      if(!isset($ip)){
        echo json_encode("error no Id");
        exit(1);
      }

      // Begin SQL Connection and Querying Data
      $conn=ConnectMySQL();
      if(!$conn instanceof mysqli){
        header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
        echo json_encode("Something went wrong with database connection\n");
        break;
      }

      $query=";";

      // Specific structure inside Input, if its an Edit request or Add request
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

      // for security password should be hashed
      //$ip->pw = hash('sha256',$ip->pw);
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
        header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
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

      //Response
      header($_SERVER["SERVER_PROTOCOL"] . " 200 Success");
      echo json_encode($row['output']);
      
      break;

    case "Buchung":
      // Content from JavaScript POST come in php://input
      $ip = json_decode(file_get_contents("php://input"));
      
      if(!isset($ip)){
        header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
        echo json_encode("error no Id");
        exit(1);
      }

      // Begin SQL Connection and Querying Data
      $conn=ConnectMySQL();
      if(!$conn instanceof mysqli){
        header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
        echo json_encode("Something went wrong with database connection\n");
        break;
      }

      $query=";";
      // Specific structure inside Input, if its an Edit request or Add request
      if($ip->Code == "E"){
      //$query = "call mssp_EditBooking(
                //N'$ip->Birthdate')";
      }
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
        header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
        echo json_encode("Error: $conn->error");
        exit(1);
      }
      
      $row=$res->fetch_assoc();

      //Output
      header($_SERVER["SERVER_PROTOCOL"] . " 200 Success");
      echo json_encode($row['output']);

      break;
  }
}


?>
