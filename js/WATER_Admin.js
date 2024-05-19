import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc,query,where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
const db = getFirestore(app);

let water_read=document.getElementById('water_read');
let water_contract=document.getElementById('water_contract');
let water_service=document.getElementById('water_service');
let water_cancelContract=document.getElementById('water_cancelContract');


// Water reading 
export function Water_read(){
    let WaterReadData = []

    water_read.addEventListener('click',function() {
      WaterReadData=[]
      const dbRef=ref(database)
      
      
      get(child(dbRef,"WATER__Reading/"))
      .then((snapshot)=>{
        
        
        snapshot.forEach((childsnapshot)=>{
          WaterReadData.push(childsnapshot.val())
            })
          
            content = `<h1>قراءة المياة</h1>
            <h3>العدد : ${WaterReadData.length}</h3>
            `;
      for (let i = 0; i < WaterReadData.length; i++) {
          content += `
              <div class="feed-back-log-content">
                <h2>الاسم: ${WaterReadData[i].name}</h2>
                <h3>رقم الهاتف: ${WaterReadData[i].phone}</h3>
                <p>العنوان: ${WaterReadData[i].address}</p>
                <p>القراءة السابقة: ${WaterReadData[i].last_reading}</p>
                <p>القراءة الحالية: ${WaterReadData[i].reading}</p>
                <p>التاريخ: ${WaterReadData[i].date}</p>
                <a href="${WaterReadData[i].fileInput}" target="_blank">الملف او الصوره</a>
                  <button class="wdone-button" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-phone="${WaterReadData[i].phone}" data-read="${WaterReadData[i].reading}">تم</button>
              </div>
          `;
      }
      document.querySelector(".board-content").innerHTML = content;
        })
        
      })
      
      
    document.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('wdone-button')) {
        const phone = e.target.dataset.phone;
        const read = e.target.dataset.read;
        console.log(read+ phone);
        e.target.style.backgroundColor='red'
    
        set(ref(database, "WATER__Reading_Done/" + phone), {
          phone: phone,
          read: read
      
        })
        waterReadDone(phone);
      }
      });
      
      function waterReadDone(phone) {
      remove(ref(database, "WATER__Reading/" +phone))
      .then(() => {
        popup.style.backgroundColor = "#74e555";
        popup.style.visibility = "visible";
        popup.innerHTML =
          "تمت القراءة بنجاح";
        setTimeout(() => {
          popup.style.visibility = "hidden";
          // window.location.reload();
        }, 1000);
      })
    }
}

// Water service
export function Water_service() {
    let waterServiceData = []

water_service.addEventListener('click',function() {
  waterServiceData=[]
  const dbRef=ref(database)
  
  
  get(child(dbRef,"WATER__requestService/"))
  .then((snapshot)=>{
    
    
    snapshot.forEach((childsnapshot)=>{
      waterServiceData.push(childsnapshot.val())
        })
      
        content = `<h1>طلبات صيانة المياة</h1>
        <h3>العدد : ${waterServiceData.length}</h3>
        `;
  for (let i = 0; i < waterServiceData.length; i++) {
      content += `
          <div class="feed-back-log-content">
              <h3>رقم الهاتف: ${waterServiceData[i].phone}</h3>
              <p>الأسم: ${waterServiceData[i].name}</p>
              <p>وصف الحاله : ${waterServiceData[i].status}</p>
              <p>العنوان : ${waterServiceData[i].city}</p>
              <p>نوع العقار : ${waterServiceData[i].buildingType}</p>
              <a href="${waterServiceData[i].fileInput}" target="_blank">الملف او الصوره</a>
              <br />
              <button class="waterServiceBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-phone="${waterServiceData[i].phone}">قبول</button>
              <button class="waterServiceBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px;  height:30px;' data-phone="${waterServiceData[i].phone}">رفض</button>
          </div>
      `;
  }
  document.querySelector(".board-content").innerHTML = content;
    })
    
  })
  
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('waterServiceBtn')) {
    const phone = e.target.dataset.phone;
    waterServiceDone(phone);
    e.target.style.backgroundColor='red'
  }else if(e.target && e.target.classList.contains('waterServiceBtn1')){
    e.target.style.backgroundColor='green'

  }
  });
  
  function waterServiceDone(phone) {
  remove(ref(database, "WATER__requestService/" +phone))
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

// Water contract
export function Water_contract() {
    let waterContractData = []

water_contract.addEventListener('click',function() {
  waterContractData=[]
  const dbRef=ref(database)
  
  
  get(child(dbRef,"WATER__requestContract/"))
  .then((snapshot)=>{
    
    
    snapshot.forEach((childsnapshot)=>{
      waterContractData.push(childsnapshot.val())
        })
      
        content = `<h1>طلبات تعاقد المياة</h1>
        <h3>العدد : ${waterContractData.length}</h3>
        `;
  for (let i = 0; i < waterContractData.length; i++) {
      content += `
          <div class="feed-back-log-content">
              <h3>رقم الهاتف: ${waterContractData[i].phone}</h3>
              <p>الأسم: ${waterContractData[i].name}</p>
              <p>اثبات الشخصية: ${waterContractData[i].identityType}</p>
              <p>رقم اثبات الشخصية : ${waterContractData[i].authNumber}</p>
              <p>العنوان : ${waterContractData[i].address}</p>
              <p>نوع العقار : ${waterContractData[i].buildingType}</p>
              <a href="${waterContractData[i].fileInput}" target="_blank">الملف او الصوره</a>
              <br />
              <button class="waterContractBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px;  height:30px;' data-phone="${waterContractData[i].phone}">قبول</button>
              <button class="waterContractBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px;   height:30px;' data-phone="${waterContractData[i].phone}">رفض</button>
          </div>
      `;
  }
  document.querySelector(".board-content").innerHTML = content;
    })
    
  })
  
  
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('waterContractBtn')) {
    const phone = e.target.dataset.phone;
    waterContractDone(phone);
    e.target.style.backgroundColor='red'
  }else if(e.target && e.target.classList.contains('waterContractBtn1')){
    e.target.style.backgroundColor='green'

  }
  });
  
  function waterContractDone(phone) {
  remove(ref(database, "WATER__requestContract/" +phone))
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

// Water cancel contract
export function Water_cancelContract(){
    let waterCancelContractData = []

water_cancelContract.addEventListener('click',function() {
  waterCancelContractData=[]
  const dbRef=ref(database)
  
  
  get(child(dbRef,"WATER__cancelContract/"))
  .then((snapshot)=>{
    
    
    snapshot.forEach((childsnapshot)=>{
      waterCancelContractData.push(childsnapshot.val())
        })
      
        content = `<h1>طلبات الغاء تعاقد المياة</h1>
        <h3>العدد : ${waterCancelContractData.length}</h3>
        `;
  for (let i = 0; i < waterCancelContractData.length; i++) {
      content += `
          <div class="feed-back-log-content">
              <h3>رقم الهاتف: ${waterCancelContractData[i].phone}</h3>
              <p>الأسم: ${waterCancelContractData[i].name}</p>
              <p>رقم العداد: ${waterCancelContractData[i].memberNo}</p>
              <p>سبب الرفع : ${waterCancelContractData[i].reason}</p>
              <p>احدث قراءه للعداد: ${waterCancelContractData[i].authNumber}</p>
              <p>المنطقة : ${waterCancelContractData[i].city}</p>
              <p>نوع العقار : ${waterCancelContractData[i].buildingType}</p>
              <br />
              <button class="waterCancelContractBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-phone="${waterCancelContractData[i].phone}">الغاء التعاقد</button>
          </div>
      `;
  }
  document.querySelector(".board-content").innerHTML = content;
    })
    
  })
  
  
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('waterCancelContractBtn')) {
    const phone = e.target.dataset.phone;
    waterCancelContractDone(phone);
    e.target.style.backgroundColor='red'
  }
  });
  
  function waterCancelContractDone(phone) {
  remove(ref(database, "WATER__cancelContract/" +phone))
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


