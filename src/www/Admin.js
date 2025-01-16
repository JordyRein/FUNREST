import Customer from "/funrest/Customer.js"
import Reservation from "/funrest/Reservation.js"

const custCol=2;


const newCustButton=document.getElementById("neu_kunde");
const newReserveButton=document.getElementById("neu_buchung");


newCustButton.onclick=()=>{
  var infotable=document.getElementById("info");
  infotable.innerHTML = "";
  var cust=new Customer("","","","","","");
  
  //for (var i=0;i<custCol;++i){
  //  var th=document.createElement("th");
  //  var label=document.createElement("label");
  //}

  for(var prop in cust){ 
    if(Object.prototype.hasOwnProperty.call(cust,prop)){
      console.log(prop);
      var tr=document.createElement("tr");
      var td=document.createElement("td");
      var label=document.createElement("label");
      label.innerHTML=prop;

      var input=document.createElement("input");
      input.type="text";

      td.appendChild(label);
      td.appendChild(input);
      tr.appendChild(td);

      infotable.appendChild(tr);
    }
  }


  
};

newReserveButton.onclick=()=>{
  var infotable=document.getElementById("info");
  infotable.innerHTML = "";

};
