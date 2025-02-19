<?php

class Customer{
  public $FirstName;
  public $LastName;
  public $Address;
  public $PLZ;
  public $Location;
  public $Sex;
  public $Birthday;
  public $Stammgast;


  function __construct($fname, $lname, $addr, $plz, $loc, $sex, $bday,$sg){
    $this->FirstName=$fname;
    $this->LastName=$lname;
    $this->Address=$addr;
    $this->PLZ=$plz;
    $this->Location=$loc;
    $this->Sex=$sex;
    $this->Birthday=$bday;
    $this->Stammgast=$sg;
  } 
}

?>
