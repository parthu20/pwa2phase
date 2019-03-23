var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitindexedDB;

var open=idb.open("storeData",1)
console.log("IndexedDB is created");

open.onupgradeneeded=function(event){
  var request=event.target.result;
var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("Object store in not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");

  var storeDB=transaction.objectStore("Formdata");
  var finalData=storeDB.getAll();
  finalData.onsuccess=function(event){
    console.log(event.target.result);
    display(event.target.result);
  }
}
function display(data){
  var parent=document.querySelector(".parent");
  for (var i = 0; i < data.length; i++) {
   var child=document.createElement("div");
   child.classList.add("child");
   var image=document.createElement("img");
   image.src="imags/image.svg";
   image.alt=data[i].name;

   var name=document.createElement("h2");
   name.textContent=data[i].name;

   var rollno=document.createElement("h2");
   rollno.textContent=data[i].rollno;

   var email=document.createElement("h2");
   email.textContent=data[i].email;

   var link=document.createElement("a");
   link.href="resume.html?id="+data[i].id;
   console.log(data[i].id);
   link.textContent="viewprofile";

   child.append(image);
   child.append(name);
   child.append(rollno);
   child.append(email);
   parent.append(child);
   child.append(link);
 }

}
