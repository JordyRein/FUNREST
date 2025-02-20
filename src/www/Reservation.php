<?php

class Reservation{
  public $CustomerId;
  public $RoomId;
  public $StartDate;
  public $EndDate;
  public $Arrival;
  public $Departure;

  function __construct($id, $rid, $start, $end, $arr, $depart){
    $this->CustomerId=$id;
    $this->RoomId=$rid;
    $this->StartDate=$start;
    $this->EndDate=$end;
    $this->Arrival=$arr;
    $this->Departure=$depart;
  }
}

?>
