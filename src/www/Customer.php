<?php

class Customer{
  public $FirstName;
  public $LastName;
  public $Address;
  public $PLZ;
  public $Location;
  public $Email;

  function __construct($fname, $lname, $addr, $plz, $loc, $email){
    $this->FirstName=$fname;
    $this->LastName=$lname;
    $this->Address=$addr;
    $this->PLZ=$plz;
    $this->Location=$loc;
    $this->Email=$email;
  } 
}

?>
