function addData(){
  var career=document.querySelector("#career").value;
  var name=document.querySelector("#name").value;
  var rollno=document.querySelector("#rollno").value;
  var email=document.querySelector("#email").value;
  var number=document.querySelector("#number").value;

  var college1=document.querySelector("#college1").value;
  var degree1=document.querySelector("#degree1").value;
  var branch1=document.querySelector("#branch1").value;
  var marks1=document.querySelector("#marks1").value;

  var college2=document.querySelector("#college2").value;
  var degree2=document.querySelector("#degree2").value;
  var branch2=document.querySelector("#branch2").value;
  var marks2=document.querySelector("#marks2").value;

  var school=document.querySelector("#school").value;
  var marks3=document.querySelector("#marks3").value;
  var yop=document.querySelector("#yop").value;

  var skills=document.querySelector("#skills").value;
  var request;
  var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitindexedDB;

  var open=idb.open("storeData",1)
  console.log("IndexedDB is created");

  open.onupgradeneeded=function(event){
    var request=event.target.result;
  var storeDB=request.createObjectStore("Formdata",{keypath:"id",autoIncrement:true});
  }
  open.onerror=function(error){
    console.log("Object store in not created",+error);
  }
  open.onsuccess=function(event){
    request=event.target.result;
    var transaction=request.transaction("Formdata","readwrite");

    var storeDB=transaction.objectStore("Formdata");
    storeDB.put({
      career:career,
        name:name,
        rollno:rollno,
        email:email,
        number:number,
        education:[{

          college:college1,
          degree:degree1,
          branch:branch1,
          marks:marks1
        },
    {
      college:college2,
      degree:degree2,
      branch:branch2,
      marks:marks2
    }],
    // {
    //   college:school,
    //   degree:"E.M",
    //   branch:marks3,
    //   marks:yop
    // }],
    skills:skills
  });
  window.open("index.html");
  }
}
