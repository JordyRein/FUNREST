<?php
include "SQLConnection.php";
include "Customer.php";

$conn = ConnectMySQL();

if($conn instanceof mysqli){
  echo "Successfully Connected\n";
  
  $query = 'select * from Kunde where Vorname like \'%.'A'.'%\'';
  $res = $conn->query($query);
  $i=0;
  $list_cust=array();
  foreach($res as $row){
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


  echo json_encode($list_cust);
  //foreach($list_cust as $l){
  //  echo json_encode($l);
  //}
}
else{
  echo "Something went teribbly wrong!\n";
}

CloseMySQL($conn);



?>
