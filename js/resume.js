var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
   paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitindexedDB;

var open=idb.open("storeData",1)
console.log("IndexedDB is created");

open.onupgradeneeded=function(event){
  var request=event.target.result;
request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("Object store in not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");

  var storeDB=transaction.objectStore("Formdata");
  var info=storeDB.get( paramValue);
  info.onsuccess=function(data){
    console.log(data.target.result);
    display(data.target.result);
    // education(data.target.result);
  }
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{
  var img=document.createElement("img");
  img.src="imags/image.svg";
  left.append(img);
  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);
  var hr=document.createElement("hr");
  hr.textContent=data.hr;
  left.append(hr);
  var rollno=document.createElement("h3");
  rollno.textContent=data.rollno;
  left.append(rollno);
  var email=document.createElement("h3");
  email.textContent=data.email;
  left.append(email);
  var number=document.createElement("h3");
  number.textContent=data.number;
  left.append(number);
  var careerobjectives=document.createElement("h3");
  careerobjectives.textContent="CareerObjectives";
  right.append(careerobjectives);
  var hr=document.createElement("hr");
  hr.textContent=data.hr;
  right.append(hr);
  var career=document.createElement("p");
  career.textContent=data.career;
  right.append(career);



  var rh2=document.createElement('h2');
  rh2.textContent="Educational details";
  right.append(rh2);
  var hr=document.createElement('hr');
  right.append(hr);

  var table=document.createElement('table');
  let row='';
  row += "<tr>"+"<th>"+"college" +"</th>"+"<th>"+"branch" +"</th>"+
  "<th>"+"degree" +"</th>"+
  "<th>"+"marks" +"</th>";
console.log(data.education);
   for ( var i in data.education){
     // console.log(data.education[i].college);


   row += "<tr>"+"<td>"+data.education[i].college +"</td>"+
   "<td>"+data.education[i].branch +"</td>"+
   "<td>"+data.education[i].degree +"</td>"+
  "<td>"+data.education[i].marks+"</td>"+"</tr>";
}
 table.innerHTML=row;
right.appendChild(table);
var skills=document.createElement("h3");
skills.textContent="skills";
right.append(skills);
var hr=document.createElement("hr");
hr.textContent=data.hr;
right.append(hr);
var skills=document.createElement("p");
skills.textContent=data.skills;
right.append(skills);
}
