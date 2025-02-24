<?php

class Mitarbeiter{
  public $Id;
  public $FirstName;
  public $LastName;
  public $Role;


  function __construct($id, $fname, $lname, $r){
    $this->Id=$id;
    $this->FirstName=$fname;
    $this->LastName=$lname;
    $this->Role=$r;
  } 
}
?>
