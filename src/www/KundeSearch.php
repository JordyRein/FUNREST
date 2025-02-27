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
    case"Zimmer":
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

        break;
    
    case "Bewertung":
        // $kundeId=urldecode($_GET["kunde"]);

        // $conn=ConnectMySQL();
        // if(!$conn instanceof mysqli){
        //     echo json_encode("Something went wrong with database connection\n");
        //     break;
        // }

        // $query = "call mssp_SearchReviewsKunde($kundeId)";
        // $res = $conn->query($query);

        // $i=0;
        // $list_reserve=array();
        // foreach ($res as $row){
        // array_push($list_reserve,new Reservation(
        //     $row['BuchungId'],
        //     $row['KundeVorname'],
        //     $row['KundeNachname'],
        //     $row['ZimmerName'],
        //     $row['BuchungZeitRaum'],
        //     $row['Anreisedatum'],
        //     $row['Abreisedatum'],
        //     $row['Preis'],
        //     $row['PrueferVorname'],
        //     $row['PrueferNachname']
        // ));

        // ++$i;
        // }
        // CloseMySQL($conn);

        // echo json_encode($list_reserve);
        break;

    case "Buchung":
        $kundeId=urldecode($_GET["kunde"]);

        $conn=ConnectMySQL();
        if(!$conn instanceof mysqli){
            echo json_encode("Something went wrong with database connection\n");
            break;
        }

        $query = "call mssp_SearchBookingsKunde($kundeId)";
        $res = $conn->query($query);

        $i=0;
        $list_reserve=array();
        foreach ($res as $row){
        array_push($list_reserve,new Reservation(
            $row['BuchungId'],
            $row['BewertungsId'],
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

    default:
        echo "Something went wrong!";

}



?>
