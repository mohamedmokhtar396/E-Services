import { app } from "./firebase.js";
import {getDatabase,get,set,ref,child,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
const db = getFirestore(app);

const database = getDatabase(app);



let uname=document.querySelectorAll("input[type=text]")[0]
let phone=document.getElementById("phone")
console.log(phone)
let tareaElements=document.querySelectorAll("textarea")[0];
let submitBtn=document.querySelectorAll("input[type=submit]")[0]



let fId=1
submitBtn.addEventListener("click", async function() {
  
  if (uname.value == "" || tareaElements.value == "" || phone.value == "") {
      uname.style.border = "1px solid red";
      phone.style.border = "1px solid red";
      tareaElements.style.border = "1px solid red";
      document.getElementById("popup").style.backgroundColor = "#e55555";
      document.getElementById("popup").style.visibility = "visible";
      document.getElementById("popup").innerHTML = "من فضلك اكمل البيانات";
      setTimeout(() => {
          document.getElementById("popup").style.visibility = "hidden";
      }, 2000);
  } else if (uname.value != "" && tareaElements.value != "" && phone.value != "") {
      uname.style.border = "1px solid black";
      phone.style.border = "1px solid black";
      tareaElements.style.border = "1px solid black";

      try {
          await addDoc(collection(db, "complaintsList"), {
            customerName: uname.value,
            customerMobile: phone.value,
            reason: tareaElements.value  
          });

          document.getElementById("popup").style.backgroundColor = "#74e555";
          document.getElementById("popup").style.visibility = "visible";
          document.getElementById("popup").innerHTML = "تم الارسال بنجاح";
          setTimeout(() => {
              document.getElementById("popup").style.visibility = "hidden";
          }, 2000);

          displayAllFeeds();
      } catch (error) {
          console.error("Error adding document: ", error);
          document.getElementById("popup").style.backgroundColor = "#e55555";
          document.getElementById("popup").style.visibility = "visible";
          document.getElementById("popup").innerHTML = "حدث خطأ، حاول مرة أخرى";
          setTimeout(() => {
              document.getElementById("popup").style.visibility = "hidden";
          }, 2000);
      }
  }
});





function displayAllFeeds() {

  const dbRef=ref(database)
 
  let cfeeds = ``;
  let feeds = []
    get(child(dbRef,"Customers_Feeds/"))
    .then((snapshot)=>{
      

      snapshot.forEach((childsnapshot)=>{
        feeds.push(childsnapshot.val())
      })

      for (let i = 0; i < feeds.length; i++) {
        fId=feeds[feeds.length-1].fId+1
        cfeeds += `
        <div class="feed-back-log-content">
        <h3 >${feeds[i].uname}</h3>
        <h4 id="customerFeedNo">${feeds[i].phone}</h4>
        <p>${feeds[i].tarea}</p>
        </div>
        `;
      }
      document.getElementById("feeds").innerHTML = cfeeds;
    })
    
    
}
displayAllFeeds()

// let check=JSON.parse(localStorage.getItem("userLoggedIn"))
// console.log(check)