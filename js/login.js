// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************
import { app } from "./firebase.js";
import { getDatabase, get,set, ref, update,child} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


let userdetails=[]
let userPhone
const database = getDatabase(app);
      const auth = getAuth();

      let submit = document.getElementById("submit");
      submit.addEventListener("click", (e) => {
        // let name=document.getElementById('name')
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            const dbRef=ref(database)
  
  
            get(child(dbRef,"users/"+user.uid))
            .then((snapshot)=>{
              
              
              snapshot.forEach((childsnapshot)=>{
                    // console.log(childsnapshot.val())
                    userdetails.push(childsnapshot.val())
                    console.log(userdetails)
                    
                    
                  })
                }).then(()=>{
                  const userData={
                    loggedIn:true,
                    admin:email,
                    name:userdetails[2],
                    phone:userdetails[3]
                  }
                  localStorage.setItem("userLoggedIn", JSON.stringify(userData));
                })
                

            const dt = new Date();
            update(ref(database, "users/" + user.uid), {
              last_login: dt,
            });

            document.getElementById("popup").style.backgroundColor = "#74e555";
            document.getElementById("popup").style.visibility = "visible";
            document.getElementById("popup").innerHTML="تم تسجيل الدخول بنجاح"
            setTimeout(() => {
              document.getElementById("popup").style.visibility = "hidden";
              window.location.href = "./home.html";
            }, 2000);
            // console.log(userdetails.length)
            


            // alert("user logged In successfully");
          })
          .catch((error) => {
            const errorcode = error.code;
            const errormsg = error.message;
            // alert(errormsg);
            document.getElementById("popup").style.backgroundColor = "#e55555";
            document.getElementById("popup").style.visibility = "visible";
            document.getElementById("popup").innerHTML = errormsg;
            setTimeout(() => {
              document.getElementById("popup").style.visibility = "hidden";
            }, 3000);
          });
      });





















var inputs = document.querySelectorAll("input:not([type=submit])");
var logInBtn = document.getElementById("submit");
var email = document.getElementById("email");
var password = document.getElementById("password");

var data = JSON.parse(localStorage.getItem("userRegister"));
logInBtn.addEventListener("click", function (e) {
  var error = false;
  for (var i = 0; i < inputs.length; i++) {
    var emptyfield = inputs[i].nextElementSibling;

    if (inputs[i].value == "") {
      emptyfield.innerHTML = `من فضلك ادخل البيانات`;
      error = true;
    } else {
      emptyfield.innerHTML = "";
      error = false;
    }
  }

  // for (var i = 0; i < data.length; i++) {
  //   if (
  //     email.value != "" &&
  //     (data[i].email == email.value || data[i].phone == email.value)
  //   ) {
  //     email.nextElementSibling.innerHTML = "";
  //   } else {
  //     email.nextElementSibling.innerHTML = "غير صحيح";
  //     error = true;
  //   }

  //   if (password.value != "" && data[i].password == password.value) {
  //     password.nextElementSibling.innerHTML = "";
  //     error = false;
  //   } else {
  //     password.nextElementSibling.innerHTML = `كلمه سر غير صحيحه`;
  //     error = true;
  //   }

  //   if (!error) {
  //     var userLoggedin = JSON.parse(localStorage.getItem("userLoggedIn")) || [];
  //     var userLogedIn = {
  //       name: data[i].name,
  //       email: data[i].email,
  //       password: data[i].password,
  //       loggedIn: true,
  //     };

  //     userLoggedin.push(userLogedIn);
  //     localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedin));
  //     console.log(userLogedIn);
  //   }
  // }

  if (error) {
    e.preventDefault();
  }
});
