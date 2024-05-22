// الغاء تعاقد مياه
// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

import { app } from "./firebase.js";
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const db = getFirestore(app);

// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

let name = document.getElementById("name");
// let serviceType = document.getElementById("serviceType");
let buildingType = document.getElementById("building-type");
let reason = document.getElementById("reason");

let city = document.getElementById("city");
let phone = document.getElementById("phone");
let meterNo = document.getElementById("meterNo");
let meterReading = document.getElementById("meterReading");
let submit = document.getElementById("send-request");

var inputs = document.querySelectorAll("input:not([type=submit])");
var selection = document.querySelectorAll("select");
console.log(selection);
var checkInputs, checkSelection;

submit.addEventListener("click", async (e) => {
  for (var i = 0; i < inputs.length; i++) {
    var emptyfield = inputs[i];
    if (inputs[i].value === "") {
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
    if (selection[i].value === "") {
      emptyfield.style.border = "2px solid red";
      checkSelection = false;
    } else {
      emptyfield.style.border = "2px solid black";
      checkSelection = true;
    }
  }

  if (checkInputs === true && checkSelection === true && meterNo.value !== 0) {
    await AddData();
  }
});

async function AddData() {
  if (phone.value !== 0) {
    const q = query(collection(db, "removeWaterMeter"), where("customerMobile", "==", phone.value));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Phone number already exists
        document.getElementById("popup").style.backgroundColor = "#e55555";
        document.getElementById("popup").style.visibility = "visible";
        document.getElementById("popup").innerHTML = "تم التسجيل مسبقا علي نفس الرقم";
        setTimeout(() => {
          document.getElementById("popup").style.visibility = "hidden";
        }, 3000);
      } else {
        // Add new document since phone number does not exist
        await setDoc(doc(collection(db, "removeWaterMeter")), {
          // serviceType: serviceType.value,
          homeType: buildingType.value,
          customerName: name.value,
          customerAddress: city.value,
          customerMobile: phone.value,
          meterNumber: meterNo.value,
          nowReadingMeter: meterReading.value,
          reason: reason.value,
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
