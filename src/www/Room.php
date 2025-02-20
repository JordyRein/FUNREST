<?php

class Room{
  public $RoomId;
  public $RoomType;
  public $Categorie;
  public $Price;
  public $PriceScale;

  function __construct($id, $typ,$cat,$price,$scale){
    $this->RoomId=$id;
    $this->RoomType=$typ;
    $this->Categorie=$cat;
    $this->Price=$price;
    $this->PriceScale=$sclae;
  }
}

?>
