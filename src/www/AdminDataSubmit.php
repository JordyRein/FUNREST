<?php

ini_set("display_errors", "1");

header("Content-Type: application/json");

if(isset($_GET["search"])){
  switch($_GET["search"]){
    case "Kunde":
      if(isset($_POST["FirstName"])){
        echo $_POST["FirstName"];
      }
      if(isset($_POST["LastName"])){
        echo $_POST["LastName"];
      }
      break;

    case "Buchung":
      if(isset($_POST["RoomId"])){
        echo $_POST["RoomId"];
      }
      break;

  }
}


?>
