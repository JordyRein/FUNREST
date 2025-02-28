<?php

class Room{
  public $Id;
  public $Name;
  public $Typ;
  public $Kategorie;
  public $Preis;
  public $Bild;

  function __construct($id, $name,$cat,$typ,$bild,$price){
    $this->Id=$id;
    $this->Name=$name;
    $this->Typ=$typ;
    $this->Kategorie=$cat;
    $this->Preis=$price;
    $this->Bild=$bild;
  }
}

?>
