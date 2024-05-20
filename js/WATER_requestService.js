// طلبات صيانة المياة
// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

import { app } from "./firebase.js";
import {  getFirestore,  doc,  setDoc,  getDocs,  collection,  query,  where,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
console.log(storage);
const db = getFirestore(app);

// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

let name = document.getElementById("name");
let buildingType = document.getElementById("building-type");
let fileInput = document.getElementById("fileInput");
var fileUrl;

let city = document.getElementById("city");
let phone = document.getElementById("phone");
let status = document.getElementById("status");
let submit = document.getElementById("send-request");

var inputs = document.querySelectorAll("input:not([type=submit])");
var selection = document.querySelectorAll("select");
console.log(selection);
var checkInputs, checkSelection;

submit.addEventListener("click", async (e) => {
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

  if (checkInputs == true && checkSelection == true && fileInput.files.length > 0) {
    
    await AddData();
  }
});

async function uploadFile() {
  submit.style.backgroundColor = 'grey';
  if (fileInput.files.length > 0) {
    let ref = storage.ref();
    let file = fileInput.files[0];
    let name = +new Date() + "-" + file.name;
    let metadata = {
      contentType: file.type,
    };
    let task = ref.child(name).put(file, metadata);
    await task
      .then(async (snapshot) => snapshot.ref.getDownloadURL())
      .then(async (url) => {
        fileUrl = url;
        console.log('fileUrl=  ' + fileUrl);
      })
      .catch(console.error);
  }
}

async function AddData() {
  if (phone.value != 0) {
    const q = query(collection(db, "waterMaintenanceRequest"), where("customerMobile", "==", phone.value));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        document.getElementById("popup").style.backgroundColor = "#e55555";
        document.getElementById("popup").style.visibility = "visible";
        document.getElementById("popup").innerHTML = "تم التسجيل مسبقا علي نفس الرقم";
        setTimeout(() => {
          document.getElementById("popup").style.visibility = "hidden";
        }, 3000);
      } else {
        await uploadFile();

        await setDoc(doc(collection(db, "waterMaintenanceRequest")), {
          customerName: name.value,
          homeType: buildingType.value,
          imageReceiptMaintenance: fileUrl,
          customerAddress: city.value,
          customerMobile: phone.value,
          details: status.value,
        });

        document.getElementById("popup").style.backgroundColor = "#74e555";
        document.getElementById("popup").style.visibility = "visible";
        document.getElementById("popup").innerHTML = "تم ارسال طلبك بنجاح";
        setTimeout(() => {
          document.getElementById("popup").style.visibility = "hidden";
          window.location.href = "./WATER.html";
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
