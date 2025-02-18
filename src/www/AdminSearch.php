<?php

include "Customer.php";
include "Reservation.php";
include "Room.php";

header("Content-Type: application/json");

if(!isset($_GET["req"])){
  echo "Oops, Something went wrong";
}

switch($_GET["req"]){
  case "Kunde":
    //$cust = new Customer("Funi", "Not so", "some street", "1234", "somwhere", "funi@funi.fun");
    //echo json_encode($cust);
    echo urldecode($_GET["search"]);
    break;

  case "Zimmer":
    //$room = new Room("1422", "Fancy", "Very Good", 2000, 1.5);
    //echo json_encode($room);

    echo urldecode($_GET["search"]);
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
