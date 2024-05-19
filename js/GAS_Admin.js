import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc,query,where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
const db = getFirestore(app);

let gas_read=document.getElementById('gas_read');
let gas_contract=document.getElementById('gas_contract');
let gas_service=document.getElementById('gas_service');
let gas_cancelContract=document.getElementById('gas_cancelContract');


// gas reading 
export function Gas_read(){

let firebaseData = []
gas_read.addEventListener('click',function() {
  firebaseData=[]
  const dbRef=ref(database)
  
  
  get(child(dbRef,"Gas__Reading/"))
  .then((snapshot)=>{
    
    
    snapshot.forEach((childsnapshot)=>{
          firebaseData.push(childsnapshot.val())
          console.log(childsnapshot.val())
        })
      
        content = `<h1>قراءة الغاز</h1>
        <h3>العدد : ${firebaseData.length}</h3> 
        `;
  for (let i = 0; i < firebaseData.length; i++) {
      content += `
          <div class="feed-back-log-content">
              <h2>الاسم: ${firebaseData[i].name}</h2>
              <h3>رقم الهاتف: ${firebaseData[i].phone}</h3>
              <p>العنوان: ${firebaseData[i].address}</p>
              <p>القراءة السابقة: ${firebaseData[i].last_gas_reading}</p>
              <p>القراءة الحالية: ${firebaseData[i].gas_reading}</p>
              <p>التاريخ: ${firebaseData[i].date}</p>
              <a href="${firebaseData[i].fileInput}" target="_blank">الملف او الصوره</a>
              <button class="done-button" style='margin-top:1rem; background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-phone="${firebaseData[i].phone}" data-read="${firebaseData[i].gas_reading}">تم</button>
          </div>
      `;
  }

  document.querySelector(".board-content").innerHTML = content;
    })
    
  }


)
  
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('done-button')) {
    const phone = e.target.dataset.phone;
    const read = e.target.dataset.read;
    console.log(read+ phone);
    e.target.style.backgroundColor='red'

    set(ref(database, "Gas__Reading_Done/" + phone), {
      phone: phone,
      read: read
  
    })
    gasReadDone(phone)
  }
  });
  
  function gasReadDone(phone) {
  remove(ref(database, "Gas__Reading/" +phone))
  .then(() => {
    popup.style.backgroundColor = "#74e555";
    popup.style.visibility = "visible";
    popup.innerHTML =
      "تمت القراءة بنجاح";
    setTimeout(() => {
      popup.style.visibility = "hidden";
      // window.location.reload();
    }, 2000);
  })
}
}

// gas service
export function Gas_service() {

    let gasServiceData = []

gas_service.addEventListener('click',function() {
  gasServiceData=[]
  const dbRef=ref(database)
  
  
  get(child(dbRef,"Gas__requestService/"))
  .then((snapshot)=>{
    
    
    snapshot.forEach((childsnapshot)=>{
      gasServiceData.push(childsnapshot.val())
        })
      
        content = `<h1>طلبات صيانة الغاز</h1>
        <h3>العدد : ${gasServiceData.length}</h3>
        `;
  for (let i = 0; i < gasServiceData.length; i++) {
      content += `
          <div class="feed-back-log-content">
              <h3>رقم الهاتف: ${gasServiceData[i].phone}</h3>
              <p>الأسم: ${gasServiceData[i].name}</p>
              <p>وصف الحاله: ${gasServiceData[i].status}</p>
              <p>العنوان : ${gasServiceData[i].city}</p>
              <p>نوع العقار : ${gasServiceData[i].buildingType}</p>
              <a href="${gasServiceData[i].fileInput}" target="_blank">الملف او الصوره</a>
              <br />
              <button class="gasServiceBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-phone="${gasServiceData[i].phone}">قبول</button>
              <button class="gasServiceBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px;  height:30px;' data-phone="${gasServiceData[i].phone}">رفض</button>
          </div>
      `;
  }
  document.querySelector(".board-content").innerHTML = content;
    })
    
  })
  
  
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('gasServiceBtn')) {
    const phone = e.target.dataset.phone;
    gasServiceDone(phone);
    e.target.style.backgroundColor='red'
  }else if(e.target && e.target.classList.contains('gasServiceBtn1')){
    e.target.style.backgroundColor='green'

  }
  });
  
  function gasServiceDone(phone) {
  remove(ref(database, "Gas__requestService/" +phone))
  .then(() => {
    popup.style.backgroundColor = "#74e555";
    popup.style.visibility = "visible";
    popup.innerHTML =
      "تم التنفيذ بنجاح";
    setTimeout(() => {
      popup.style.visibility = "hidden";
      // window.location.reload();
    }, 1000);
  })
}
}
// gas contract
export function Gas_contract() {

let gasContractData = []

gas_contract.addEventListener('click',function() {
  gasContractData=[]
  const dbRef=ref(database)
  
  
  get(child(dbRef,"Gas__requestContract/"))
  .then((snapshot)=>{
    
    snapshot.forEach((childsnapshot)=>{
      gasContractData.push(childsnapshot.val())
        })
      
        content = `<h1>طلبات تعاقد الغاز</h1>
        <h3>العدد : ${gasContractData.length}</h3>
        `;
  for (let i = 0; i < gasContractData.length; i++) {
      content += `
          <div class="feed-back-log-content">
              <h3>رقم الهاتف: ${gasContractData[i].phone}</h3>
              <p>الأسم: ${gasContractData[i].name}</p>
              <p>اثبات الشخصية: ${gasContractData[i].identityType}</p>
              <p>رقم اثبات الشخصية : ${gasContractData[i].authNumber}</p>
              <p>العنوان : ${gasContractData[i].address}</p>
              <p>نوع العقار : ${gasContractData[i].buildingType}</p>
              <a href="${gasContractData[i].fileInput}" target="_blank">الملف او الصوره</a>
              <br />
              <button class="gasContractBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-phone="${gasContractData[i].phone}">قبول</button>
              <button class="gasContractBtn" style='background-color:var(--pcolor);color:var(--scolor);  width:40px; height:30px;' data-phone="${gasContractData[i].phone}">رفض</button>
          </div>
      `;
  }
  document.querySelector(".board-content").innerHTML = content;
    })
    
  })

document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('gasContractBtn')) {
    const phone = e.target.dataset.phone;
    e.target.style.backgroundColor='red'
    gasContractDone(phone);
  }else if(e.target && e.target.classList.contains('gasContractBtn1')){
    e.target.style.backgroundColor='green'

  }
  });
  
  function gasContractDone(phone) {
  remove(ref(database, "Gas__requestContract/" +phone))
  .then(() => {
    popup.style.backgroundColor = "#74e555";
    popup.style.visibility = "visible";
    popup.innerHTML =
      "تم التنفيذ بنجاح";
    setTimeout(() => {
      popup.style.visibility = "hidden";
      // window.location.reload();
    }, 1000);
  })
}
}

// gas cancel contract
export function Gas_cancelContract(){
    let gasCancelContractData = []

gas_cancelContract.addEventListener('click',function() {
  gasCancelContractData=[]
  const dbRef=ref(database)
  
  
  get(child(dbRef,"Gas__cancelContract/"))
  .then((snapshot)=>{
    
    
    snapshot.forEach((childsnapshot)=>{
      gasCancelContractData.push(childsnapshot.val())
        })
      
        content = `<h1>طلبات الغاء تعاقد الغاز</h1>
        <h3>العدد : ${gasCancelContractData.length}</h3>
        `;
  for (let i = 0; i < gasCancelContractData.length; i++) {
      content += `
          <div class="feed-back-log-content">
              <h3>رقم الهاتف: ${gasCancelContractData[i].phone}</h3>
              <p>الأسم: ${gasCancelContractData[i].name}</p>
              <p>رقم العداد: ${gasCancelContractData[i].memberNo}</p>
              <p> سبب الرفع: ${gasCancelContractData[i].reason}</p>
              <p>احدث قراءه للعداد: ${gasCancelContractData[i].authNumber}</p>
              <p>المنطقة : ${gasCancelContractData[i].city}</p>
              <p>نوع العقار : ${gasCancelContractData[i].buildingType}</p>
              <br />
              <button class="gasCancelContractBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-phone="${gasCancelContractData[i].phone}">الغاء التعاقد</button>
          </div>
      `;
  }
  document.querySelector(".board-content").innerHTML = content;
    })
    
  })
  
  
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('gasCancelContractBtn')) {
    const phone = e.target.dataset.phone;
    gasCancelContractDone(phone);
    e.target.style.backgroundColor='red'
  }
  });
  
  function gasCancelContractDone(phone) {
  remove(ref(database, "Gas__cancelContract/" +phone))
  .then(() => {
    popup.style.backgroundColor = "#74e555";
    popup.style.visibility = "visible";
    popup.innerHTML =
      "تم التنفيذ بنجاح";
    setTimeout(() => {
      popup.style.visibility = "hidden";
      // window.location.reload();
    }, 1000);
  })
}
}


