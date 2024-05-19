// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

import { app } from "./firebase.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const database = getDatabase(app);
const auth = getAuth(app);



let submit = document.getElementById("submit");

// click button

var inputs = document.querySelectorAll("input:not([type=submit])");
var registerBtn = document.getElementById("submit");
var checkName, checkphone, checkConfirmPassword
registerBtn.addEventListener("click", function (e) {
  //   console.log("submit");
  // e.preventDefault()

  for (var i = 0; i < inputs.length; i++) {
    var emptyfield = inputs[i].nextElementSibling;
    if (inputs[i].value == "") {
      // inputs[i].nextElementSibling.innerHTML = `${inputs[i].name} Required`
      emptyfield.innerHTML = `من فضلك اكمل البيانات`;
      // errorf = true;
    } else {
      emptyfield.innerHTML = "";
      
    }
  }

  //  regex
  var userName = document.getElementById("name");
  var userNamePattren = /^([ا-يa-zA-Zا0-9_\s]+)$/;

  if (userName.value != 0) {
    if (userNamePattren.test(userName.value) == false) {
      userName.nextElementSibling.innerHTML = `الاسم غير صالح`;
      // errorf = true;
    }else{
      checkName=true;
    }
  }

  var phone = document.getElementById("number");
  var phonePattren = /^[0-9]{11}$/;

  if (phone.value != 0) {
    if (phonePattren.test(phone.value) == false) {
      phone.nextElementSibling.innerHTML = `رقم الهاتف غير صحيح`;
      // errorf = true;
    }else{
      checkphone=true;
    }
  }



  var confirmPassword = document.getElementById("confirm-password");
  if (confirmPassword.value != 0) {
    if (confirmPassword.value != password.value) {
      confirmPassword.nextElementSibling.innerHTML = `غير صحيح اعد كتابه كلمه المرور`;
      // errorf = true;
    }else{
      checkConfirmPassword=true;
    }
  }


});

submit.addEventListener("click", function (e) {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("number").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (checkName==true && checkphone==true &&checkConfirmPassword==true) {
    createUserWithEmailAndPassword(auth, email,password, name, phone)
      .then((userCredential) => {
        const user = userCredential.user;

        return set(ref(database, "users/" + user.uid), {
          email: email,
          name: name,
          phone: phone,
        });
      })
      .then(() => {
        document.getElementById("popup").style.backgroundColor = "#74e555";
        document.getElementById("popup").style.visibility = "visible";
        document.getElementById("popup").innerHTML =
          "تم انشاء الحساب بنجاح";
        setTimeout(() => {
          document.getElementById("popup").style.visibility = "hidden";
          window.location.href = "./login.html";
        }, 2000);
        // alert('user created successfully')
      })
      .catch((error) => {
        const errorcode = error.code;
        const errormsg = error.message;
        // alert(errormsg)
        document.getElementById("popup").style.backgroundColor = "#e55555";
        document.getElementById("popup").style.visibility = "visible";
        document.getElementById("popup").innerHTML = errormsg;
        setTimeout(() => {
          document.getElementById("popup").style.visibility = "hidden";
        }, 3000);
      });
  } else {
    return;
  }
});
