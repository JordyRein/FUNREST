<?php

class ReviewKunde{
  public $BewertungId;
  public $Titel;
  public $Rating;
  public $BewertungText;
  public $Status;
  public $Anreise;
  public $Abreise;
  public $Zimmername;

  function __construct($bid,$titel,$rating, $text, $geprueft, $an, $ab, $name){
    $this->BewertungId=$bid;
    $this->Titel=$titel;
    $this->Rating=$rating;
    $this->BewertungText=$text;
    $this->Status=$geprueft;
    $this->Anreise=$an;
    $this->Abreise=$ab;
    $this->Zimmername=$name;
  }
}

?>
