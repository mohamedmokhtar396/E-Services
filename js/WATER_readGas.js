// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

import { app } from "./firebase.js";
import {
  getDatabase,
  get,
  set,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

import { firebaseConfig } from "./firebase.js";
firebase.initializeApp(firebaseConfig)
// const app=initializeApp(firebaseConfig)
const storage=firebase.storage()
console.log(storage)
const database = getDatabase(app);

// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************
var checkUserData = JSON.parse(localStorage.getItem("userLoggedIn"));
        console.log(checkUserData);

let name = document.getElementById("name");


let obj = new Date(); 
let day = obj.getUTCDate(); 
let month = obj.getUTCMonth() + 1; 
let year = obj.getUTCFullYear(); 
console.log(`${day}/${month}/${year}`)
name.value=checkUserData.name
let address = document.getElementById("address");
let phone = document.getElementById("phone");
phone.value=checkUserData.phone;
let last_reading = document.getElementById("last_reading");
console.log(last_reading.value)
let reading = document.getElementById("reading");
let fileInput = document.getElementById("fileInput");
var fileUrl

let submit = document.getElementById("submit");





// القراءة السابقة
function last_read() {
  const dbRef = ref(database);
  get(child(dbRef, "WATER__Reading_Done/" + phone.value))
  .then((snapshot)=>{
    console.log(snapshot.exists())
    if (snapshot.exists()==false) {
      last_reading.value =0
    } else{
      last_reading.value = snapshot.val().read

    }

    })

}
last_read()




submit.addEventListener("click",async function () {

  submit.style.backgroundColor=''
  if (phone.value != 0 && reading.value != 0 && address.value != 0 && fileInput.files.length>0 ) {
    await uploadFile()
    await AddData();

  } 
if(address.value!=0){
    address.style.border = "2px solid black";
}else{
    address.style.border = "2px solid red";
}
if(reading.value!=0){
   reading.style.border = "2px solid black";
    
}else{
   reading.style.border = "2px solid red";
}
if(fileInput.value!=0){
    fileInput.style.border = "none";
    
}else{
  fileInput.style.border='2px solid red'
}
});

async function uploadFile() {
  if(fileInput.files.length>0){
    submit.style.backgroundColor='grey'

    let ref = firebase.storage().ref();
    let file=fileInput.files[0];
    let name=+new Date() +"-"+file.name
    let metadata={
        contentType:file.type
    }
    let task=ref.child(name).put(file,metadata)
    await task
    .then(async snapshot => snapshot.ref.getDownloadURL())
    .then(async url=>{
        console.log(url)
        fileUrl=url
        console.log('fileUrl=  '+fileUrl)
      })
      .catch(console.error)
      console.log('after snapshot')
    }
}

function AddData(){
  const dbRef = ref(database);
  get(child(dbRef, "WATER__Reading/" + phone.value)).then((snapshot) => {
    if (snapshot.exists()) {
      document.getElementById("popup").style.backgroundColor = "#e55555";
      document.getElementById("popup").style.visibility = "visible";
      document.getElementById("popup").innerHTML =
        "تم الرفع مسبقا علي نفس الرقم";
      setTimeout(() => {
        document.getElementById("popup").style.visibility = "hidden";
      }, 3000);

      // check if there is last reading in database
    } else if(reading.value < last_reading.value){
        document.getElementById("popup").style.backgroundColor = "#e55555";
        document.getElementById("popup").style.visibility = "visible";
        document.getElementById("popup").innerHTML =
          "قراءة غير صحيحة";
          setTimeout(() => {
            document.getElementById("popup").style.visibility = "hidden";
           
        }, 3000);

      }else{
        set(ref(database, "WATER__Reading/" + phone.value), {
          name: name.value,
          address: address.value,
          last_reading: last_reading.value,
          reading: reading.value,
          phone: phone.value,
          fileInput: fileUrl,
          date:`${day}/${month}/${year}`
  
        })
          .then(() => {
           
            document.getElementById("popup").style.backgroundColor = "#74e555";
            document.getElementById("popup").style.visibility = "visible";
            document.getElementById("popup").innerHTML =
              "تم ارسال القراءة بنجاح";
            setTimeout(() => {
              document.getElementById("popup").style.visibility = "hidden";
              window.location.href = "./WATER.html";
            }, 2000);
  
          })
          .catch((error) => {
            document.getElementById("popup").style.backgroundColor = "#e55555";
            document.getElementById("popup").style.visibility = "visible";
            document.getElementById("popup").innerHTML = error.message;
            setTimeout(() => {
              document.getElementById("popup").style.visibility = "hidden";
            
            }, 3000);
          });
      }
    
  });
}