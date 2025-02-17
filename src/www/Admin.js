import {Customer} from "/funrest/Customer.js"
import {Reservation} from "/funrest/Reservation.js"

const newCustButton=document.getElementById("neu_kunde");
const newReserveButton=document.getElementById("neu_buchung");
const kSearch=document.getElementById("ks_button");
const zSearch=document.getElementById("zs_button");
const bSearch=document.getElementById("bs_button");

kSearch.onclick=()=>{
  console.log("kunde search");
  //Implementation here
}

zSearch.onclick=()=>{
  console.log("zimmer search");
  //Implementation here
}

bSearch.onclick=()=>{
  console.log("buchung search");
  //Implementation here
}

function CreateForm(formObject, btnClickEvent){
  var infotable=document.getElementById("info");
  infotable.innerHTML = "";

  for(var prop in formObject){ 
    if(Object.prototype.hasOwnProperty.call(formObject,prop)){

      var rowdiv=document.createElement("div");
      rowdiv.style.display="flex";

      var div25=document.createElement("div");
      div25.style.width="25%";
      
      var div75=document.createElement("div");
      div75.style.width="75%";

      var label=document.createElement("label");
      label.innerHTML=prop;
      div25.appendChild(label);

      var input=document.createElement("input");
      input.type="text";
      input.style.width="50%";
      div75.appendChild(input);

      rowdiv.appendChild(div25);
      rowdiv.appendChild(div75);
      infotable.appendChild(rowdiv);
    }
  }

  var submit=document.createElement("button");
  submit.innerHTML="Submit";
  submit.type="button";
  submit.onclick=btnClickEvent;

  infotable.appendChild(submit);
  
}

newCustButton.onclick=()=>{
  var cust=new Customer("","","","","","");
  
  CreateForm(cust, SubmitNewCustomer);
};

function SubmitNewCustomer(){
  console.log("cust");
  // Implementation here
}

newReserveButton.onclick=()=>{
  var reserve = new Reservation("","","","");

  CreateForm(reserve, SubmitNewReservation);
};

function SubmitNewReservation(){
  console.log("reserve");
  // Implementation here
}
