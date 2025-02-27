<?php

include "SQLConnection.php";
include "Review.php";

ini_set("display_errors", "1");

header("Content-Type: application/json");

$input= json_decode(file_get_contents("php://input"));


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

?>
