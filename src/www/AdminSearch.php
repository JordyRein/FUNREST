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
    $s=urldecode($_GET["search"]);

    $conn=ConnectMySQL();
    if(!$conn instanceof mysqli){
      echo json_encode("Something went wrong with database connection\n");
      break;
    }

    $query = "call mssp_SearchRoom('%".$s."%')";
    $res = $conn->query($query);

    $i=0;
    $list_room=array();
    foreach ($res as $row){
      array_push($list_room,new Room(
          $row['Name'],
          $row['Kategorie'],
          $row['Typ'],
          $row['Bild'],
          $row['Preis']
      );

      ++$i;
    }
    CloseMySQL($conn);

    echo json_encode($list_room);
    break;

  case "Buchung":
    $s=urldecode($_GET["search"]);

    $conn=ConnectMySQL();
    if(!$conn instanceof mysqli){
      echo json_encode("Something went wrong with database connection\n");
      break;
    }

    $query = "call mssp_SearchBooking(".$s.")";
    $res = $conn->query($query);

    $i=0;
    $list_reserve=array();
    foreach ($res as $row){
      array_push($list_reserve,new Reservation(
          $row['BuchungId'],
          $row['KundeVorname'],
          $row['KundeNachname'],
          $row['ZimmerName'],
          $row['BuchungZeitRaum'],
          $row['Anreise'],
          $row['Abreise'],
          $row['Preis'],
          $row['PrueferVorname'],
          $row['PrueferNachname']
      );

      ++$i;
    }
    CloseMySQL($conn);

    echo json_encode($list_reserve);
    break;

  default:
    echo "Something went wrong!";
}


?>
