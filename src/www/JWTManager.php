<?php

class JWTManager{

  private $secret;

  public function __construct($s){
    $this->secret=$s;
  }

  public function createToken($pl){
    $ecData = rtrim(base64_encode($pl),'=');
    $sig = rtrim(base64_encode(hash_hmac("sha256", $ecData, $this->secret, true)),'=');
    return $ecData . '.' . $sig;
  }

  public function validateToken($t){
    list($ecData, $ecSig) = explode('.', $t);

    $sig = base64_decode(str_pad($ecSig, strlen($ecSig), '=', STR_PAD_RIGHT));
    $exSig = hash_hmac("sha256", $ecData, $this->secret, true);
    
    return hash_equals($sig, $exSig);
  }

  public function decodeToken($t){
    list($ecPl, $ecSig) = explode('.', $t);
    return base64_decode(str_pad($ecPl, strlen($ecPl), '=', STR_PAD_RIGHT));
  }

}

?>
