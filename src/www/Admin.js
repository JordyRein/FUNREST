import {Customer} from "/funrest/Customer.js"
import {Reservation} from "/funrest/Reservation.js"

const newCustButton=document.getElementById("neu_kunde");
const newReserveButton=document.getElementById("neu_buchung");
const kSearch=document.getElementById("ks_button");
const zSearch=document.getElementById("zs_button");
const bSearch=document.getElementById("bs_button");

const infotable=document.getElementById("info");

//Ajax XML
function RequestPHP(sign, filename, okPtr, errPtr, data){
  var xhr = new XMLHttpRequest();
  if(!["GET", "POST"].includes(sign)){ 
    console.log("Error on Http header");
  }
  xhr.open(sign, filename);

  xhr.onreadystatechange = function(){
    const DONE=4;
    const OK=200;
    if (xhr.readyState==DONE){
      if(xhr.status==OK){
        okPtr(xhr.responseText);
      }
      else{
        errPtr();
      }
    }
  }
  xhr.send(data);
}

//Fetch
async function RequestPHPAsync(url, todo, err){
  try{
    const res = await fetch (url);
    const data = await res.text();
    todo(data);
  }
  catch{
    err();
  }
}

kSearch.onclick=()=>{
  const squery=document.getElementById("search_kunde");
  const url = "AdminSearch.php?req=Kunde&search="+encodeURIComponent(squery.value);
  console.log(url);
  infotable.innerHTML="";

  RequestPHPAsync(url, 
      (data)=>{
        infotable.innerHTML+=data;
      },
      ()=>{
        console.log("Error Requesting Customer");
      }
  )

}

zSearch.onclick=()=>{
  const squery=document.getElementById("search_zimmer");
  const url="AdminSearch.php?req=Zimmer&search="+encodeURIComponent(squery.value);
  infotable.innerHTML="";
  
  RequestPHPAsync(url, 
      (data)=>{
        infotable.innerHTML+=data;
      },
      ()=>{
        console.log("Error Requesting Customer");
      }
  )
}

bSearch.onclick=()=>{
  const squery=document.getElementById("search_buchung");
  const url="AdminSearch.php?req=Buchung&search="+encodeURIComponent(squery.value);
  infotable.innerHTML="";

  RequestPHPAsync(url, 
      (data)=>{
        infotable.innerHTML+=data;
      },
      ()=>{
        console.log("Error Requesting Customer");
      }
  )
}

function CreateForm(formObject, btnClickEvent){
  //var infotable=document.getElementById("info");
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
      input.name=prop;
      input.type="text";
      input.style.width="50%";
      div75.appendChild(input);

      rowdiv.appendChild(div25);
      rowdiv.appendChild(div75);
      infotable.appendChild(rowdiv);
    }
  }

  var submit=document.createElement("button");
  submit.innerHTML="Send";
  submit.type="button";
  submit.onclick=btnClickEvent;

  infotable.appendChild(submit);
  
}

newCustButton.onclick=()=>{
  var cust=new Customer("","","","","","");
  
  CreateForm(cust, SubmitNewCustomer);
};

function SubmitNewCustomer(){
  var fd = new FormData(infotable);
  
  RequestPHP("POST", "AdminDataSubmit.php?search=Kunde",
      (data)=>{
        infotable.innerHTML=data;
      },
      ()=>{
      },
      fd);
}

newReserveButton.onclick=()=>{
  var reserve = new Reservation("","","","","","");

  CreateForm(reserve, SubmitNewReservation);
};

function SubmitNewReservation(){
  var fd = new FormData(infotable);

  RequestPHP("POST", "AdminDataSubmit.php?search=Buchung",
      (data)=>{
        infotable.innerHTML=data;
      },
      ()=>{
      },
      fd);
}
