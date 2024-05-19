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

const database = getDatabase(app);

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
let memberNo = document.getElementById("memberNo");
let authNumber = document.getElementById("authNumber");
let submit = document.getElementById("send-request");


var inputs = document.querySelectorAll("input:not([type=submit])");
var selection = document.querySelectorAll("select");
console.log(selection);
var checkInputs, checkSelection;
submit.addEventListener("click", function (e) {
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

  if (checkInputs == true && checkSelection == true && memberNo.value!=0 ) {
    AddData();
  }
});



function AddData() {
  const dbRef = ref(database);
  if (phone.value != 0) {
    get(child(dbRef, "WATER__cancelContract/" + phone.value)).then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("popup").style.backgroundColor = "#e55555";
        document.getElementById("popup").style.visibility = "visible";
        document.getElementById("popup").innerHTML =
          "تم التسجيل مسبقا علي نفس الرقم";
        setTimeout(() => {
          document.getElementById("popup").style.visibility = "hidden";
        }, 3000);
      } else {
        set(ref(database, "WATER__cancelContract/" + phone.value), {
          name: name.value,
          // serviceType: serviceType.value,
          buildingType: buildingType.value,
          reason: reason.value,
          city: city.value,
          phone: phone.value,
          memberNo: memberNo.value,
          authNumber: authNumber.value,
      
        })
          .then(() => {
            document.getElementById("popup").style.backgroundColor = "#74e555";
            document.getElementById("popup").style.visibility = "visible";
            document.getElementById("popup").innerHTML = "تم ارسال طلبك بنجاح";
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
}
