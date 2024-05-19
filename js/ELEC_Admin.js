import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc,query,where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
const db = getFirestore(app);


let elec_read=document.getElementById('elec_read');
let elec_contract=document.getElementById('elec_contract');
let elec_service=document.getElementById('elec_service');
let elec_cancelContract=document.getElementById('elec_cancelContract');


// Elec reading section
export function ELEC_Read() {

let ElecReadData = []

elec_read.addEventListener('click', async function() {
  ElecReadData = [];
  
  try {
    const querySnapshot = await getDocs(collection(db, "electricityMeterReading"));
    querySnapshot.forEach((doc) => {
      ElecReadData.push(doc.data());
    });
    
    let content = `<h1>قراءة الكهرباء</h1>
                   <h3>العدد : ${ElecReadData.length}</h3>`;
                   
    for (let i = 0; i < ElecReadData.length; i++) {
      content += `
        <div class="feed-back-log-content">
          <h2>الاسم: ${ElecReadData[i].customerName}</h2>
          <h3>رقم الهاتف: ${ElecReadData[i].phone}</h3>
          <p>العنوان: ${ElecReadData[i].customerAddress}</p>
          <p>القراءة السابقة: ${ElecReadData[i].previousReading}</p>
          <p>القراءة الحالية: ${ElecReadData[i].nowReading}</p>
          <p>التاريخ: ${ElecReadData[i].date}</p>
          <a href="${ElecReadData[i].imageMeterReceipt}" target="_blank">الملف او الصوره</a>
          <button class="edone-button" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${querySnapshot.docs[i].id}">تم</button>
        </div>`;
    }
    
    document.querySelector(".board-content").innerHTML = content;
  } catch (error) {
    console.error("حدث خطأ اثناء تحميل البيانات ", error);
    
  }
});

document.addEventListener('click', async function(e) {
  if (e.target && e.target.classList.contains('edone-button')) {
    const docId = e.target.dataset.id;
    e.target.style.backgroundColor = 'red';
    
    await elecReadDone(docId);
  }
});

async function elecReadDone(docId) {
  try {
    await deleteDoc(doc(db, "electricityMeterReading", docId));
    
    popup.style.backgroundColor = "#74e555";
    popup.style.visibility = "visible";
    popup.innerHTML = "تمت القراءة بنجاح";
    
    setTimeout(() => {
      popup.style.visibility = "hidden";
      // Optionally, you can remove the item from the DOM here without reloading
      document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
      ElecReadData.length--
    }, 1000);
  } catch (error) {
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

// elec service
export function ELEC_service() {

let elecServiceData = []

elec_service.addEventListener('click', async function() {
  elecServiceData = [];
  
  try {
    const querySnapshot = await getDocs(collection(db, "electricityMaintenance"));
    querySnapshot.forEach((doc) => {
      elecServiceData.push({ id: doc.id, ...doc.data() });
    });
    
    let content = `<h1>طلبات صيانة الكهرباء</h1>
                   <h3>العدد : ${elecServiceData.length}</h3>`;
                   
    for (let i = 0; i < elecServiceData.length; i++) {
      content += `
        <div class="feed-back-log-content">
          <h3>رقم الهاتف: ${elecServiceData[i].customerMobile}</h3>
          <p>الأسم: ${elecServiceData[i].customerName}</p>
          <p> وصف الحاله: ${elecServiceData[i].details}</p>
          <p>العنوان : ${elecServiceData[i].customerAddress}</p>
          <p>نوع العقار : ${elecServiceData[i].homeType}</p>
          <a href="${elecServiceData[i].imageReceiptMaintenance}" target="_blank">الملف او الصوره</a>
          <br />
          <button class="elecServiceBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${elecServiceData[i].id}">قبول</button>
          <button class="elecServiceBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px;  height:30px;' data-id="${elecServiceData[i].id}">رفض</button>
        </div>`;
    }
    
    document.querySelector(".board-content").innerHTML = content;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
});

document.addEventListener('click', async function(e) {
  if (e.target && e.target.classList.contains('elecServiceBtn')) {
    const docId = e.target.dataset.id;
    await elecServiceDone(docId);
    e.target.style.backgroundColor = 'red';
  } else if (e.target && e.target.classList.contains('elecServiceBtn1')) {
    e.target.style.backgroundColor = 'green';
    const docId = e.target.dataset.id;
    setTimeout(function() {
      document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
    },1000)
  }
});


async function elecServiceDone(docId) {
  try {
    await deleteDoc(doc(db, "electricityMaintenance", docId));
    
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

// elec contract
export function ELEC_contract() {


let elecContractData = []

elec_contract.addEventListener('click', async function() {
  elecContractData = [];
  
  try {
    const querySnapshot = await getDocs(collection(db, "electricityInstallation"));
    querySnapshot.forEach((doc) => {
      elecContractData.push({ id: doc.id, ...doc.data() });
    });
    
    let content = `<h1>طلبات تعاقد الكهرباء</h1>
                   <h3>العدد : ${elecContractData.length}</h3>`;
                   
    for (let i = 0; i < elecContractData.length; i++) {
      content += `
        <div class="feed-back-log-content">
          <h3>رقم الهاتف: ${elecContractData[i].customerMobile}</h3>
          <p>الأسم: ${elecContractData[i].customerName}</p>
          <p>اثبات الشخصية: ${elecContractData[i].identityType}</p>
          <p>رقم اثبات الشخصية : ${elecContractData[i].authNumber}</p>
          <p>العنوان : ${elecContractData[i].customerAddress}</p>
          <p>نوع العقار : ${elecContractData[i].homeType}</p>
          <a href="${elecContractData[i].fileInput}" target="_blank">الملف او الصوره</a>
          <br />
          <button class="elecContractBtn1" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${elecContractData[i].id}">قبول</button>
          <button class="elecContractBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px;  height:30px;' data-id="${elecContractData[i].id}">رفض</button>
        </div>`;
    }
    
    document.querySelector(".board-content").innerHTML = content;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
});

document.addEventListener('click', async function(e) {
  if (e.target && e.target.classList.contains('elecContractBtn')) {
    const docId = e.target.dataset.id;
    await elecContractDone(docId);
    e.target.style.backgroundColor = 'red';
  } else if (e.target && e.target.classList.contains('elecContractBtn1')) {
    e.target.style.backgroundColor = 'green';
    const docId = e.target.dataset.id;
    setTimeout(function() {
      document.querySelector(`button[data-id='${docId}']`).parentElement.remove();
    },1000)
  }
});

async function elecContractDone(docId) {
  try {
    await deleteDoc(doc(db, "electricityInstallation", docId));
    
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

// elec cancel contract
export function ELEC_cancelContract(){

    let elecCancelContractData = [];
    
    elec_cancelContract.addEventListener('click', async function() {
      elecCancelContractData = [];
      
      try {
        const querySnapshot = await getDocs(collection(db, "removeElectricityMeter"));
        querySnapshot.forEach((doc) => {
          elecCancelContractData.push({ id: doc.id, ...doc.data() });
        });
        
        let content = `<h1>طلبات الغاء تعاقد الكهرباء</h1>
                       <h3>العدد : ${elecCancelContractData.length}</h3>`;
                       
        for (let i = 0; i < elecCancelContractData.length; i++) {
          content += `
            <div class="feed-back-log-content">
              <h3>رقم الهاتف: ${elecCancelContractData[i].customerMobile}</h3>
              <p>الأسم: ${elecCancelContractData[i].customerName}</p>
              <p>رقم العداد: ${elecCancelContractData[i].meterNumber}</p>
              <p>سبب الرفع : ${elecCancelContractData[i].reason}</p>
              <p> احدث قراءه للعداد : ${elecCancelContractData[i].nowReadingMeter}</p>
              <p>المنطقة : ${elecCancelContractData[i].customerAddress}</p>
              <p>نوع العقار : ${elecCancelContractData[i].homeType}</p>
              <br />
              <button class="elecCancelContractBtn" style='background-color:var(--pcolor);color:var(--scolor); width:40px; height:30px;' data-id="${elecCancelContractData[i].id}">الغاء التعاقد</button>
            </div>`;
        }
        
        document.querySelector(".board-content").innerHTML = content;
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    });
    
    document.addEventListener('click', async function(e) {
      if (e.target && e.target.classList.contains('elecCancelContractBtn')) {
        const docId = e.target.dataset.id;
        await elecCancelContractDone(docId);
        e.target.style.backgroundColor = 'red';
      }
    });
    
    async function elecCancelContractDone(docId) {
      try {
        await deleteDoc(doc(db, "removeElectricityMeter", docId));
        
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

