<?php

include "Customer.php";
include "Reservation.php";
include "Room.php";
include "SQLConnection.php";

header("Content-Type: application/json");

if(!isset($_GET["req"])){
  echo "Oops, Something went wrong";
}

switch($_GET["req"]){
  case "Kunde":
    $s=urldecode($_GET["search"]);

    $conn=ConnectMySQL();
    if(!$conn instanceof mysqli){
      echo json_encode("Something went wrong with database connection\n");
      break;
    }

    $query = "call mssp_SearchKunde('%".$s."%')";
    $res = $conn->query($query);

    $i=0;
    $list_cust=array();
    foreach ($res as $row){
      array_push($list_cust,new Customer($row['Vorname'],
          $row['Nachname'],
          $row['Strasse_Nummer'],
          $row['PLZ'],
          $row['Stadt'],
          $row['Geschlecht'],
          $row['Geburstdatum'],
          $row['Stammgast'])
      );

      ++$i;
    }
    CloseMySQL($conn);

    echo json_encode($list_cust);

    break;

  case "Zimmer":
    //$room = new Room("1422", "Fancy", "Very Good", 2000, 1.5);
    //echo json_encode($room);

    $s=urldecode($_GET["search"]);

    $conn=ConnectMySQL();
    if(!$conn instanceof mysqli){
      echo json_encode("Something went wrong with database connection\n");
      break;
    }

    $query = "call mssp_SearchRoom('%".$s."%')";
    $res = $conn->query($query);

    $i=0;
    $list_cust=array();
    foreach ($res as $row){
      array_push($list_cust,new Customer($row['Vorname'],
          $row['Nachname'],
          $row['Strasse_Nummer'],
          $row['PLZ'],
          $row['Stadt'],
          $row['Geschlecht'],
          $row['Geburstdatum'],
          $row['Stammgast'])
      );

      ++$i;
    }
    CloseMySQL($conn);

    echo json_encode($list_cust);
    break;

  case "Buchung":
    //$buch = new Reservation("23", "1422", "June", "Jule", "Jule", "Monday");
    //echo json_encode($buch);

    echo urldecode($_GET["search"]);
    break;

  default:
    echo "Something went wrong!";
}


?>
