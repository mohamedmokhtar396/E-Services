
// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

import { app } from "./firebase.js";
import {getDatabase,get,set,ref,child,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { firebaseConfig } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc,query,where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
const db = getFirestore(app);
firebase.initializeApp(firebaseConfig)
// const app=initializeApp(firebaseConfig)
const storage=firebase.storage()

const database = getDatabase(app);

// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

let name = document.getElementById("name");
let address = document.getElementById("address");
let buildingType = document.getElementById("building-type");
let identityType = document.getElementById("identity-type");
let fileInput = document.getElementById("fileInput");
var fileUrl

// let city = document.getElementById("city");
let phone = document.getElementById("phone");
// let email = document.getElementById("email");
let authNumber = document.getElementById("authNumber");
let submit = document.getElementById("send-request");


var inputs = document.querySelectorAll("input:not([type=submit])");
var selection = document.querySelectorAll("select");
console.log(selection);
var checkInputs, checkSelection;
submit.addEventListener("click", async (e)=> {
  for (var i = 0; i < inputs.length; i++) {
    var emptyfield = inputs[i];
    if (inputs[i].value == "") {
      document.getElementById("popup").style.backgroundColor = "#e55555";
      document.getElementById("popup").style.visibility = "visible";
      document.getElementById("popup").innerHTML = `من فضلك اكمل البيانات`;
      setTimeout(() => {
        document.getElementById("popup").style.visibility = "hidden";
      }, 3000);
      emptyfield.style.border = "2px solid red";
      checkInputs = false;
    } else {
      emptyfield.style.border = "2px solid black";
      checkInputs = true;
    }
  }
  for (var i = 0; i < selection.length; i++) {
    var emptyfield = selection[i];
    if (selection[i].value == "") {
      emptyfield.style.border = "2px solid red";
      checkSelection = false;
    } else {
      emptyfield.style.border = "2px solid black";
      checkSelection = true;
    }
  }

  if (checkInputs == true && checkSelection == true && fileInput.files.length>0 ) {
    AddData();
  }
});

async function uploadFile(){
  submit.style.backgroundColor='grey'
  if(fileInput.files.length>0){

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
        // console.log(url)
        fileUrl=url
        console.log('fileUrl=  '+fileUrl)
      })
      .catch(console.error)
      console.log('after snapshot')
    }
}



async function AddData() {
    if (phone.value != 0) {
        const q = query(collection(db, "electricityInstallation"), where("customerMobile", "==", phone.value));
        try {
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            if (!querySnapshot.empty) {
                document.getElementById("popup").style.backgroundColor = "#e55555";
                document.getElementById("popup").style.visibility = "visible";
                document.getElementById("popup").innerHTML = "تم التسجيل مسبقا علي نفس الرقم";
                setTimeout(() => {
                    document.getElementById("popup").style.visibility = "hidden";
                }, 3000);
            } else {
                await uploadFile()
                
                await setDoc(doc(collection(db, "electricityInstallation")), {
                    customerName: name.value,
                    customerAddress: address.value,
                    homeType: buildingType.value,
                    identityType: identityType.value,
                    imageReceipt: fileUrl,
                    customerMobile: phone.value,
                    authNumber: authNumber.value,
                });

                document.getElementById("popup").style.backgroundColor = "#74e555";
                document.getElementById("popup").style.visibility = "visible";
                document.getElementById("popup").innerHTML = "تم ارسال طلبك بنجاح";
                setTimeout(() => {
                    document.getElementById("popup").style.visibility = "hidden";
                    window.location.href = "./ELEC.html";
                }, 2000);
            }
        } catch (error) {
            document.getElementById("popup").style.backgroundColor = "#e55555";
            document.getElementById("popup").style.visibility = "visible";
            document.getElementById("popup").innerHTML = error.message;
            setTimeout(() => {
                document.getElementById("popup").style.visibility = "hidden";
            }, 3000);
        }
    }
}

