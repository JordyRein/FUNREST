<?php

include "Customer.php";
include "Reservation.php";
include "Room.php";
include "SQLConnection.php";

header("Content-Type: application/json");

if(!isset($_GET["req"])){
  echo "Oops, Something went wrong";
}

$dateStart=urldecode($_GET["start"]);
$dateEnd=urldecode($_GET["end"]);

$skategorie=urldecode($_GET["kategorie"]);
$styp=urldecode($_GET["typ"]);

$cat=-1;
$t=-1;
switch(strtolower($skategorie)){
case "premium":
  $cat=2;
  break;
case "luxus":
  $cat=3;
  break;
case "standard":
  $cat=1;
  break;
default:
  break;
}
switch(strtolower($styp)){
case "einzelzimmer":
  $t=1;
  break;
case "doppelzimmer":
  $t=2;
  break;
default:
  break;  
}


$conn=ConnectMySQL();
if(!$conn instanceof mysqli){
  echo json_encode("Something went wrong with database connection\n");
  exit(1);
}

$query = "call mssp_SearchRoomFiltered(N'$dateStart', N'$dateEnd', ".$cat.",".$t.")";
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
    ));

    ++$i;
}
CloseMySQL($conn);

echo json_encode($list_room);


?>
