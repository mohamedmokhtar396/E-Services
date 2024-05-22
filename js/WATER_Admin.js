import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc,query,where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
const db = getFirestore(app);

let water_read=document.getElementById('water_read');
let water_contract=document.getElementById('water_contract');
let water_service=document.getElementById('water_service');
let water_cancelContract=document.getElementById('water_cancelContract');


// Water reading 
export function Water_read() {
  let waterReadData = [];

  water_read.addEventListener('click', async function() {
      waterReadData = [];

      try {
          const querySnapshot = await getDocs(collection(db, "waterMeterReading"));
          querySnapshot.forEach((doc) => {
              waterReadData.push({ id: doc.id, ...doc.data() });
          });

          let content = `<h1>قراءة المياة</h1>
                         <h3>العدد : ${waterReadData.length}</h3>`;

          for (let i = 0; i < waterReadData.length; i++) {
              content += `
                  <div class="feed-back-log-content">
                      <h2>الاسم: ${waterReadData[i].customerName}</h2>
                      <h3>رقم الهاتف: ${waterReadData[i].phone}</h3>
                      <p>العنوان: ${waterReadData[i].customerAddress}</p>
                      <p>القراءة السابقة: ${waterReadData[i].previousReading}</p>
                      <p>القراءة الحالية: ${waterReadData[i].nowReading}</p>
                      <p>التاريخ: ${waterReadData[i].date}</p>
                      <a href="${waterReadData[i].imageMeterReceipt}" target="_blank">الملف او الصوره</a>
                      <button class="wdone-button" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${querySnapshot.docs[i].id}">تم</button>
                  </div>`;
          }

          document.querySelector(".board-content").innerHTML = content;
      } catch (error) {
          console.error("Error getting water reading documents: ", error);
      }
  });

  document.addEventListener('click', async function(e) {
      if (e.target && e.target.classList.contains('wdone-button')) {
          const docId = e.target.dataset.id;
          await waterReadDone(docId);
          e.target.style.backgroundColor = 'red';
      }
  });

  async function waterReadDone(docId) {
      try {
          await deleteDoc(doc(db, "waterMeterReading", docId));

          popup.style.backgroundColor = "#74e555";
          popup.style.visibility = "visible";
          popup.innerHTML = "تمت القراءة بنجاح";

          setTimeout(() => {
              popup.style.visibility = "hidden";
              document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
          }, 1000);
      } catch (error) {
          console.error("Error deleting water reading document: ", error);
          popup.style.backgroundColor = "#e55555";
          popup.style.visibility = "visible";
          popup.innerHTML = "حدث خطأ أثناء القراءة";

          setTimeout(() => {
              popup.style.visibility = "hidden";
          }, 3000);
      }
  }
}



// Water service
export function Water_service() {
  let waterServiceData = [];

  water_service.addEventListener('click', async function() {
      waterServiceData = [];
      
      try {
          const querySnapshot = await getDocs(collection(db, "waterMaintenanceRequest"));
          querySnapshot.forEach((doc) => {
              waterServiceData.push({ id: doc.id, ...doc.data() });
          });
          
          let content = `<h1>طلبات صيانة المياة</h1>
                         <h3>العدد : ${waterServiceData.length}</h3>`;
                         
          for (let i = 0; i < waterServiceData.length; i++) {
              content += `
                  <div class="feed-back-log-content">
                      <h3>رقم الهاتف: ${waterServiceData[i].customerMobile}</h3>
                      <p>الأسم: ${waterServiceData[i].customerName}</p>
                      <p>وصف الحاله : ${waterServiceData[i].details}</p>
                      <p>العنوان : ${waterServiceData[i].customerAddress}</p>
                      <p>نوع العقار : ${waterServiceData[i].homeType}</p>
                      <a href="${waterServiceData[i].imageReceiptMaintenance}" target="_blank">الملف او الصوره</a>
                      <br />
                      <button class="waterServiceBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${waterServiceData[i].id}">قبول</button>
                      <button class="waterServiceBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px;  height:30px;' data-id="${waterServiceData[i].id}">رفض</button>
                  </div>`;
          }
          
          document.querySelector(".board-content").innerHTML = content;
      } catch (error) {
          console.error("Error getting documents: ", error);
      }
  });
  
  document.addEventListener('click', async function(e) {
      if (e.target && e.target.classList.contains('waterServiceBtn')) {
          const docId = e.target.dataset.id;
          await waterServiceDone(docId);
          e.target.style.backgroundColor = 'red';
      } else if (e.target && e.target.classList.contains('waterServiceBtn1')) {
          e.target.style.backgroundColor = 'green';
          const docId = e.target.dataset.id;
          setTimeout(function() {
              document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
          }, 1000)
      }
  });

  async function waterServiceDone(docId) {
      try {
          await deleteDoc(doc(db, "waterMaintenanceRequest", docId));
          
          popup.style.backgroundColor = "#74e555";
          popup.style.visibility = "visible";
          popup.innerHTML = "تم التنفيذ بنجاح";
          
          setTimeout(() => {
              popup.style.visibility = "hidden";
              // Optionally, remove the item from the DOM without reloading the page
              document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
          }, 1000);
      } catch (error) {
          console.error("Error deleting document: ", error);
          popup.style.backgroundColor = "#e55555";
          popup.style.visibility = "visible";
          popup.innerHTML = "حدث خطأ أثناء حذف الطلب";
          setTimeout(() => {
              popup.style.visibility = "hidden";
          }, 3000);
      }
  }
}


// Water contract
export function Water_contract() {
  let waterContractData = [];

  water_contract.addEventListener('click', async function() {
      waterContractData = [];
      
      try {
          const querySnapshot = await getDocs(collection(db, "waterInstallation"));
          querySnapshot.forEach((doc) => {
              waterContractData.push({ id: doc.id, ...doc.data() });
          });
          
          let content = `<h1>طلبات تعاقد المياة</h1>
                         <h3>العدد : ${waterContractData.length}</h3>`;
                         
          for (let i = 0; i < waterContractData.length; i++) {
              content += `
                  <div class="feed-back-log-content">
                      <h3>رقم الهاتف: ${waterContractData[i].customerMobile}</h3>
                      <p>الأسم: ${waterContractData[i].customerName}</p>
                      <p>اثبات الشخصية: ${waterContractData[i].identityType}</p>
                      <p>رقم اثبات الشخصية : ${waterContractData[i].authNumber}</p>
                      <p>العنوان : ${waterContractData[i].customerAddress}</p>
                      <p>نوع العقار : ${waterContractData[i].homeType}</p>
                      <a href="${waterContractData[i].imageReceipt}" target="_blank">الملف او الصوره</a>
                      <br />
                      <button class="waterContractBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px;  height:30px;' data-id="${waterContractData[i].id}">قبول</button>
                      <button class="waterContractBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px;   height:30px;' data-id="${waterContractData[i].id}">رفض</button>
                  </div>`;
          }
          
          document.querySelector(".board-content").innerHTML = content;
      } catch (error) {
          console.error("Error getting documents: ", error);
      }
  });
  
  document.addEventListener('click', async function(e) {
      if (e.target && e.target.classList.contains('waterContractBtn')) {
          const docId = e.target.dataset.id;
          await waterContractDone(docId);
          e.target.style.backgroundColor = 'red';
      } else if (e.target && e.target.classList.contains('waterContractBtn1')) {
          e.target.style.backgroundColor = 'green';
          const docId = e.target.dataset.id;
          setTimeout(function() {
              document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
          }, 1000)
      }
  });

  async function waterContractDone(docId) {
      try {
          await deleteDoc(doc(db, "waterInstallation", docId));
          
          popup.style.backgroundColor = "#74e555";
          popup.style.visibility = "visible";
          popup.innerHTML = "تم التنفيذ بنجاح";
          
          setTimeout(() => {
              popup.style.visibility = "hidden";
              // Optionally, remove the item from the DOM without reloading the page
              document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
          }, 1000);
      } catch (error) {
          console.error("Error deleting document: ", error);
          popup.style.backgroundColor = "#e55555";
          popup.style.visibility = "visible";
          popup.innerHTML = "حدث خطأ أثناء حذف الطلب";
          setTimeout(() => {
              popup.style.visibility = "hidden";
          }, 3000);
      }
  }
}

// Water cancel contract

export function Water_cancelContract() {
  let waterCancelContractData = [];

  water_cancelContract.addEventListener('click', async function() {
      waterCancelContractData = [];

      try {
          const querySnapshot = await getDocs(collection(db, "removeWaterMeter"));
          querySnapshot.forEach((doc) => {
              waterCancelContractData.push({ id: doc.id, ...doc.data() });
          });

          let content = `<h1>طلبات الغاء تعاقد المياة</h1>
                         <h3>العدد : ${waterCancelContractData.length}</h3>`;

          for (let i = 0; i < waterCancelContractData.length; i++) {
              content += `
                  <div class="feed-back-log-content">
                      <h3>رقم الهاتف: ${waterCancelContractData[i].customerMobile}</h3>
                      <p>الأسم: ${waterCancelContractData[i].customerName}</p>
                      <p>رقم العداد: ${waterCancelContractData[i].meterNumber}</p>
                      <p>سبب الرفع : ${waterCancelContractData[i].reason}</p>
                      <p>احدث قراءه للعداد: ${waterCancelContractData[i].nowReadingMeter}</p>
                      <p>المنطقة : ${waterCancelContractData[i].customerAddress}</p>
                      <p>نوع العقار : ${waterCancelContractData[i].homeType}</p>
                      <br />
                      <button class="waterCancelContractBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${waterCancelContractData[i].id}">الغاء التعاقد</button>
                  </div>`;
          }

          document.querySelector(".board-content").innerHTML = content;
      } catch (error) {
          console.error("Error getting documents: ", error);
      }
  });

  document.addEventListener('click', async function(e) {
      if (e.target && e.target.classList.contains('waterCancelContractBtn')) {
          const docId = e.target.dataset.id;
          await waterCancelContractDone(docId);
          e.target.style.backgroundColor = 'red';
      }
  });

  async function waterCancelContractDone(docId) {
      try {
          await deleteDoc(doc(db, "removeWaterMeter", docId));

          popup.style.backgroundColor = "#74e555";
          popup.style.visibility = "visible";
          popup.innerHTML = "تم التنفيذ بنجاح";

          setTimeout(() => {
              popup.style.visibility = "hidden";
              document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
          }, 1000);
      } catch (error) {
          console.error("Error deleting document: ", error);
          popup.style.backgroundColor = "#e55555";
          popup.style.visibility = "visible";
          popup.innerHTML = "حدث خطأ أثناء الغاء التعاقد";
          setTimeout(() => {
              popup.style.visibility = "hidden";
          }, 3000);
      }
  }
}


