
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
        errPtr(xhr.status);
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
