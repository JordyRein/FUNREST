<?php

class Review{
  public $BewertungId;
  public $KundeVorname;
  public $KundeNachname;
  public $PrueferVorname;
  public $PrueferNachname;
  public $Titel;
  public $Rating;
  public $BewertungText;
  public $Status;

  function __construct($bid,$kFirstName, $kLastName, $pFirstName, $pLastName ,$titel,$rating, $text, $geprueft){
    $this->BewertungId=$bid;
    $this->KundeVorname=$kFirstName;
    $this->KundeNachname=$kLastName;
    $this->PrueferVorname=$pFirstName;
    $this->PrueferNachname=$pLastName;
    $this->Titel=$titel;
    $this->Rating=$rating;
    $this->BewertungText=$text;
    $this->Status=$geprueft;
  }
}

?>
