#!/bin/bash

unameOut="$(uname -s)"
echo "Current OS:${unameOut}"

echo "Initiating mySQL script"

echo "reading config data"

filename="config.txt"

usr=""
pass=""

db="FUNREST"

while mapfile -t -n 2 ip && ((${#ip[@]}));
do
  IFS='=' read -ra u <<< ${ip[0]}
  usr=${u[1]}
  IFS='=' read -ra p <<< ${ip[1]}
  pass=${p[1]}
done < $filename

case "${unameOut}" in
  Linux*) 
    cat table.sql | mysql -u $usr -p$pass $db 2>/dev/null

    echo "mySQL script initialized"
    ;;
  MINGW*) 

    echo "mySQL script initialized"
    ;;
  *)     
    machine="Unknown Machine:${unameOut}"
    echo "cannot initialize mySQL script"
    ;;
esac

