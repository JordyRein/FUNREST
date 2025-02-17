<?php

include "Customer.php";


header("Content-Type: application/json");

$cust = new Customer("Funi", "Not so", "some street", "1234", "somwhere", "funi@funi.fun");

echo json_encode($cust);

?>
