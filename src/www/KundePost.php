<?php

include "SQLConnection.php";
include "Review.php";
include "Reservation.php";

ini_set("display_errors", "1");

header("Content-Type: application/json");

$input= json_decode(file_get_contents("php://input"));

switch($_GET['req']){
  case "ProfilAnlegen":
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

    $res = $conn->query($query);

    if($conn->error){
      echo json_encode("Error: $conn->error");
      exit(1);
    }
    
    $row=$res->fetch_assoc();
    echo json_encode($row['output']);
    
    break;

  case "ProfileUpdaten":
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

      
      
      $query = "call mssp_EditKunde(
                $ip->Id, 
                N'$ip->FirstName',
                N'$ip->LastName',
                N'$ip->Address',
                N'$ip->PLZ',
                N'$ip->City',
                N'$ip->Sex',
                N'$ip->Birthdate')";
      
      $res = $conn->query($query);

      if($conn->error){
        echo json_encode("Error: $conn->error");
        exit(1);
      }
      
      $row=$res->fetch_assoc();
      echo json_encode($row['output']);

    break;
  case "BewertungHinzufügen":
      if(isset($input)){
          $conn=ConnectMySQL();
        
          if(!$conn instanceof mysqli){
            echo json_encode("login err connection fault");
            exit(1);
          }
        
          $query= "call mssp_AddReview($input->id, $input->rating, N'$input->titel', N'$input->text', $input->bId)";
          $res = $conn->query($query);
          $row = $res->fetch_assoc();
        
          if ($conn->error){
            echo json_encode("err", $conn->error);
          }
        
          CloseMySQL($conn);
          echo json_encode($row['asdf']);
        //   echo json_encode('ok');
        }
      break;
  case "BuchungHinzufügen":
      if(isset($input)){
          $conn=ConnectMySQL();
        
          if(!$conn instanceof mysqli){
            echo json_encode("login err connection fault");
            exit(1);
          }
        
          $query= "call mssp_AddReservationKunde( $input->KundenId, 
                                                  $input->ZimmerId, 
                                                  $input->BuchungsZeitraum, 
                                                  $input->Kosten, 
                                                  N'$input->Anreise', 
                                                  N'$input->Abreise')";
        
          $res = $conn->query($query);
        
          if ($conn->error){
            echo json_encode("err", $conn->error);
          }
        
          CloseMySQL($conn);
          echo json_encode('ok');
        }
      break;
    default:
    break;
}



?>
