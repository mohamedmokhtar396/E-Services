import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc,query,where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
const db = getFirestore(app);

let gas_read=document.getElementById('gas_read');
let gas_contract=document.getElementById('gas_contract');
let gas_service=document.getElementById('gas_service');
let gas_cancelContract=document.getElementById('gas_cancelContract');


// gas reading 
export function Gas_read() {
  let gasReadData = [];

  gas_read.addEventListener('click', async function() {
    gasReadData = [];
    
    try {
      const querySnapshot = await getDocs(collection(db, "gasMeterReading"));
      querySnapshot.forEach((doc) => {
        gasReadData.push(doc.data());
      });
      
      let content = `<h1>قراءة الغاز</h1>
                     <h3>العدد : ${gasReadData.length}</h3>`;
                     
      for (let i = 0; i < gasReadData.length; i++) {
        content += `
          <div class="feed-back-log-content">
            <h2>الاسم: ${gasReadData[i].customerName}</h2>
            <h3>رقم الهاتف: ${gasReadData[i].phone}</h3>
            <p>العنوان: ${gasReadData[i].customerAddress}</p>
            <p>القراءة السابقة: ${gasReadData[i].previousReading}</p>
            <p>القراءة الحالية: ${gasReadData[i].nowReading}</p>
            <p>التاريخ: ${gasReadData[i].date}</p>
            <a href="${gasReadData[i].imageMeterReceipt}" target="_blank">الملف او الصوره</a>
            <button class="gdone-button" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${querySnapshot.docs[i].id}">تم</button>
          </div>`;
      }
      
      document.querySelector(".board-content").innerHTML = content;
    } catch (error) {
      console.error("حدث خطأ اثناء تحميل البيانات ", error);
    }
  });

  document.addEventListener('click', async function(e) {
    if (e.target && e.target.classList.contains('gdone-button')) {
      const docId = e.target.dataset.id;
      e.target.style.backgroundColor = 'red';
      
      await gasReadDone(docId);
    }
  });

  async function gasReadDone(docId) {
    try {
      await deleteDoc(doc(db, "gasMeterReading", docId));
        
        popup.style.backgroundColor = "#74e555";
        popup.style.visibility = "visible";
        popup.innerHTML = "تمت القراءة بنجاح";
        
        setTimeout(() => {
          popup.style.visibility = "hidden";
          document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
          gasReadData.length--;
        }, 1000);
      }
       catch (error) {
          console.error("Error deleting document: ", error);
          popup.style.backgroundColor = "#e55555";
          popup.style.visibility = "visible";
          popup.innerHTML = "حدث خطأ أثناء حذف القراءة";
          setTimeout(() => {
            popup.style.visibility = "hidden";
          }, 3000);
    }
  }
}

// gas service
export function Gas_service() {
  let gasServiceData = [];

  gas_service.addEventListener('click', async function() {
    gasServiceData = [];
    
    try {
      const querySnapshot = await getDocs(collection(db, "gasMaintenance"));
      querySnapshot.forEach((doc) => {
        gasServiceData.push({ id: doc.id, ...doc.data() });
      });
      
      let content = `<h1>طلبات صيانة الغاز</h1>
                     <h3>العدد : ${gasServiceData.length}</h3>`;
                     
      for (let i = 0; i < gasServiceData.length; i++) {
        content += `
          <div class="feed-back-log-content">
            <h3>رقم الهاتف: ${gasServiceData[i].customerMobile}</h3>
            <p>الأسم: ${gasServiceData[i].customerName}</p>
            <p>وصف الحاله: ${gasServiceData[i].details}</p>
            <p>العنوان : ${gasServiceData[i].customerAddress}</p>
            <p>نوع العقار : ${gasServiceData[i].homeType}</p>
            <a href="${gasServiceData[i].imageReceiptMaintenance}" target="_blank">الملف او الصوره</a>
            <br />
            <button class="gasServiceBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${gasServiceData[i].id}">قبول</button>
            <button class="gasServiceBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px;  height:30px;' data-id="${gasServiceData[i].id}">رفض</button>
          </div>`;
      }
      
      document.querySelector(".board-content").innerHTML = content;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  });

  document.addEventListener('click', async function(e) {
    if (e.target && e.target.classList.contains('gasServiceBtn')) {
      const docId = e.target.dataset.id;
      await gasServiceDone(docId);
      e.target.style.backgroundColor = 'red';
    } else if (e.target && e.target.classList.contains('gasServiceBtn1')) {
      e.target.style.backgroundColor = 'green';
      const docId = e.target.dataset.id;
      setTimeout(function() {
        document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
      }, 1000);
    }
  });

  async function gasServiceDone(docId) {
    try {
      await deleteDoc(doc(db, "gasMaintenance", docId));
      
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

// gas contract
export function Gas_contract() {
  let gasContractData = [];

  gas_contract.addEventListener('click', async function() {
    gasContractData = [];
    
    try {
      const querySnapshot = await getDocs(collection(db, "gasInstallation"));
      querySnapshot.forEach((doc) => {
        gasContractData.push({ id: doc.id, ...doc.data() });
      });
      
      let content = `<h1>طلبات تعاقد الغاز</h1>
                     <h3>العدد : ${gasContractData.length}</h3>`;
                     
      for (let i = 0; i < gasContractData.length; i++) {
        content += `
          <div class="feed-back-log-content">
            <h3>رقم الهاتف: ${gasContractData[i].customerMobile}</h3>
            <p>الأسم: ${gasContractData[i].customerName}</p>
            <p>اثبات الشخصية: ${gasContractData[i].identityType}</p>
            <p>رقم اثبات الشخصية : ${gasContractData[i].authNumber}</p>
            <p>العنوان : ${gasContractData[i].customerAddress}</p>
            <p>نوع العقار : ${gasContractData[i].homeType}</p>
            <a href="${gasContractData[i].imageReceipt}" target="_blank">الملف او الصوره</a>
            <br />
            <button class="gasContractBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${gasContractData[i].id}">قبول</button>
            <button class="gasContractBtn" style='background-color:var(--pcolor);color:var(--scolor);  width:40px; height:30px;' data-id="${gasContractData[i].id}">رفض</button>
          </div>`;
      }
      
      document.querySelector(".board-content").innerHTML = content;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  });

  document.addEventListener('click', async function(e) {
    if (e.target && e.target.classList.contains('gasContractBtn')) {
      const docId = e.target.dataset.id;
      await gasContractDone(docId);
      e.target.style.backgroundColor = 'red';
    } else if (e.target && e.target.classList.contains('gasContractBtn1')) {
      e.target.style.backgroundColor = 'green';
      const docId = e.target.dataset.id;
      setTimeout(function() {
        document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
      }, 1000);
    }
  });

  async function gasContractDone(docId) {
    try {
      await deleteDoc(doc(db, "gasInstallation", docId));
      
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


// gas cancel contract
export function Gas_cancelContract() {
  let gasCancelContractData = [];

  gas_cancelContract.addEventListener('click', async function() {
    gasCancelContractData = [];
    
    try {
      const querySnapshot = await getDocs(collection(db, "removeGasMeter"));
      querySnapshot.forEach((doc) => {
        gasCancelContractData.push({ id: doc.id, ...doc.data() });
      });
      
      let content = `<h1>طلبات الغاء تعاقد الغاز</h1>
                     <h3>العدد : ${gasCancelContractData.length}</h3>`;
                     
      for (let i = 0; i < gasCancelContractData.length; i++) {
        content += `
          <div class="feed-back-log-content">
            <h3>رقم الهاتف: ${gasCancelContractData[i].customerMobile}</h3>
            <p>الأسم: ${gasCancelContractData[i].customerName}</p>
            <p>رقم العداد: ${gasCancelContractData[i].meterNumber}</p>
            <p> سبب الرفع: ${gasCancelContractData[i].reason}</p>
            <p>احدث قراءه للعداد: ${gasCancelContractData[i].nowReadingMeter}</p>
            <p>المنطقة : ${gasCancelContractData[i].customerAddress}</p>
            <p>نوع العقار : ${gasCancelContractData[i].homeType}</p>
            <br />
            <button class="gasCancelContractBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${gasCancelContractData[i].id}">الغاء التعاقد</button>
          </div>`;
      }
      
      document.querySelector(".board-content").innerHTML = content;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  });

  document.addEventListener('click', async function(e) {
    if (e.target && e.target.classList.contains('gasCancelContractBtn')) {
      const docId = e.target.dataset.id;
      await gasCancelContractDone(docId);
      e.target.style.backgroundColor = 'red';
    }
  });

  async function gasCancelContractDone(docId) {
    try {
      await deleteDoc(doc(db, "removeGasMeter", docId));
      
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
      popup.innerHTML = "حدث خطأ أثناء الغاء التعاقد";
      setTimeout(() => {
        popup.style.visibility = "hidden";
      }, 3000);
    }
  }
}



