<?php

class Room{
  public $Name;
  public $Typ;
  public $Kategorie;
  public $Preis;
  public $Bild;

  function __construct($name,$cat,$typ,$bild,$price){
    $this->Name=$name;
    $this->Typ=$typ;
    $this->Kategorie=$cat;
    $this->Preis=$price;
    $this->Bild=$bild;
  }
}

?>
