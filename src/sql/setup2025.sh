#!/bin/bash

usr="schueler"
pass="1234"
db="FUNREST"

unameOut="$(uname -s)"
echo "Current OS:${unameOut}"

echo "Initiating mySQL script"

case "${unameOut}" in
  Linux*) 

    cat table.sql | mysql -u $usr -p$pass $db

    echo "mySQL script initialized"
    ;;
  MINGW*) 
    machine=MinGw
    ;;
  *)     
    machine="Unknown Machine:${unameOut}"
    echo "cannot initialize mySQL script"
    ;;
esac

