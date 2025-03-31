
async function simpleHash(input){
  const enc = new TextEncoder();
  const t = await crypto.subtle.digest('SHA-256', enc.encode(input));
  const arr = new Uint8Array(t);
  const res = arr.reduce((hex, b)=>hex+b.toString(16).padStart(2,'0'),'');

  return res;
}
