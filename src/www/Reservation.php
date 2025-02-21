<?php

class Reservation{
  public $BuchungId;
  public $KundeVorname;
  public $KundeNachname;
  public $ZimmerName;
  public $BuchungZeitRaum;
  public $Anreise;
  public $Abreise;
  public $Preis;
  public $MAVorname;
  public $MANachname;

  function __construct($id, $kv, $kn, $zn, $bzr, $anr, $abr, $p, $mav, $man){
    $this->BuchungId=$id;
    $this->KundeVorname=$kv;
    $this->KundeNachname=$kn;
    $this->ZimmerName=$zn;
    $this->BuchungZeitRaum=$bzr;
    $this->Anreise=$anr;
    $this->Abreise=$abr;
    $this->Preis=$p;
    $this->MAVorname=$mav;
    $this->MANachname=$man;
  }
}

?>
