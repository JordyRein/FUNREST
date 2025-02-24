<?php
include "SQLConnection.php";
  
header ("Content-Type:application/json");

if(isset($_POST["UID"]) and isset($_POST["PW"])){
  $conn = ConnectMySQL();
  if(!$conn instanceof mysqli){
    echo json_encode("something went wrong");
    break;
  }
  
  $id=$_POST["UID"];
  $pw=password_hash($_POST["PW"], PASSWORD_DEFAULT);

  $query="call mssp_CheckLogin(".$id.",",$pw.")";
  $res=$conn->query($query);

  if($res->num_rows!=1){
    echo json_encode(null);
  }
  
  CloseMySQL($conn);

}

?>

