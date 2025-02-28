<?php

include "Customer.php";
include "Reservation.php";
include "Room.php";
include "Review.php";
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
      array_push($list_cust,new Customer(
          $row['Id'],
          $row['Vorname'],
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
    

    $cat=-1;
    $t=-1;
    switch(strtolower($s)){
    case "premium":
      $cat=2;
      break;
    case "luxus":
      $cat=3;
      break;
    case "standard":
      $cat=1;
      break;
    case "einzelbett":
      $t=1;
      break;
    case "doppelbett":
      $t=2;
      break;
    default:
      break;
    }

    $conn=ConnectMySQL();
    if(!$conn instanceof mysqli){
      echo json_encode("Something went wrong with database connection\n");
      break;
    }

    $query = "call mssp_SearchRoom(".$cat.",".$t.")";
    $res = $conn->query($query);

    $i=0;
    $list_room=array();
    foreach ($res as $row){
      array_push($list_room,new Room(
          $row['Id'],
          $row['Name'],
          $row['Kategorie'],
          $row['Typ'],
          $row['Bild'],
          $row['Preis']
      ));

      ++$i;
    }
    CloseMySQL($conn);

    echo json_encode($list_room);
    break;

  case "Buchung":
    $s=urldecode($_GET["search"]);
    $k=-1;
    if($s != ''){
      $k = $s;
    }

    $conn=ConnectMySQL();
    if(!$conn instanceof mysqli){
      echo json_encode("Something went wrong with database connection\n");
      break;
    }

    $query = "call mssp_SearchBooking(".$k.")";
    $res = $conn->query($query);

    $i=0;
    $list_reserve=array();
    foreach ($res as $row){
      array_push($list_reserve,new Reservation(
          $row['BuchungId'],
          $row['BewertungsId'],
          $row['KundeId'],
          $row['KundeVorname'],
          $row['KundeNachname'],
          $row['ZimmerName'],
          $row['BuchungZeitRaum'],
          $row['Anreisedatum'],
          $row['Abreisedatum'],
          $row['Preis'],
          $row['PrueferVorname'],
          $row['PrueferNachname']
      ));

      ++$i;
    }
    CloseMySQL($conn);

    echo json_encode($list_reserve);
    break;

  case "Bewertung":
    $open=urldecode($_GET["open"]);
    $s=-1;
    switch(strtolower($open)){
      case "-1":
        $s=-1;
        break;
      case "0":
        $s=0;
        break;
      case "1":
        $s=1;
        break;
      default:
        break;
      }

    $conn=ConnectMySQL();
    if(!$conn instanceof mysqli){
      echo json_encode("Something went wrong with database connection\n");
      break;
    }

    $query = "call mssp_SearchReview(".$s." )";
    $res = $conn->query($query);

    $i=0;
    $list_review=array();
    foreach ($res as $row){
      array_push($list_review,new Review(
          $row['BewertungId'],
          $row['KundeVorname'],
          $row['KundeNachname'],
          $row['PrueferVorname'],
          $row['PrueferNachname'],
          $row['Titel'],
          $row['Rating'],
          $row['BewertungText'],
          $row['Status']
      ));

      ++$i;
    }
    CloseMySQL($conn);

    echo json_encode($list_review);
    break;

  default:
    echo "Something went wrong!";
}


?>
