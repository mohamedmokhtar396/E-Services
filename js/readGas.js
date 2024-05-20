import { app } from "./firebase.js";
import { getFirestore, doc, setDoc, getDocs, addDoc, collection, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
console.log(storage);
const db = getFirestore(app);

var checkUserData = JSON.parse(localStorage.getItem("userLoggedIn"));
console.log(checkUserData);

let name = document.getElementById("name");

let obj = new Date(); 
let day = obj.getUTCDate(); 
let month = obj.getUTCMonth() + 1; 
let year = obj.getUTCFullYear(); 
name.value = checkUserData.name;

let address = document.getElementById("address");
let phone = document.getElementById("phone");
phone.value = checkUserData.phone;
let last_gas_reading = document.getElementById("last_gas_reading");
let gas_reading = document.getElementById("gas_reading");
let fileInput = document.getElementById("fileInput");
let submit = document.getElementById("submit");
let fileUrl;

submit.addEventListener("click", async function () {
  submit.style.backgroundColor = '';
  
  if (phone.value && gas_reading.value && address.value && fileInput.files.length > 0) {
    
    await AddData();
  }

  if (address.value) {
    address.style.border = "2px solid black";
  } else {
    address.style.border = "2px solid red";
  }

  if (gas_reading.value) {
    gas_reading.style.border = "2px solid black";
  } else {
    gas_reading.style.border = "2px solid red";
  }

  if (last_gas_reading.value) {
    last_gas_reading.style.border = "2px solid black";
  } else {
    last_gas_reading.style.border = "2px solid red";
  }

  if (fileInput.value) {
    fileInput.style.border = "none";
  } else {
    fileInput.style.border = '2px solid red';
  }
});

async function uploadFile() {
  if (fileInput.files.length > 0) {
    submit.style.backgroundColor = 'grey';
    let ref = firebase.storage().ref();
    let file = fileInput.files[0];
    let name = +new Date() + "-" + file.name;
    let metadata = { contentType: file.type };
    let task = ref.child(name).put(file, metadata);

    await task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        fileUrl = url;
        console.log('fileUrl = ' + fileUrl);
      })
      .catch(console.error);
  }
}

async function AddData() {
  const q = query(collection(db, "gasMeterReading"), where("phone", "==", phone.value));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    document.getElementById("popup").style.backgroundColor = "#e55555";
    document.getElementById("popup").style.visibility = "visible";
    document.getElementById("popup").innerHTML = "تم الرفع مسبقا علي نفس الرقم";
    setTimeout(() => {
      document.getElementById("popup").style.visibility = "hidden";
    }, 3000);

  } else if (gas_reading.value < last_gas_reading.value) {
    document.getElementById("popup").style.backgroundColor = "#e55555";
    document.getElementById("popup").style.visibility = "visible";
    document.getElementById("popup").innerHTML = "قراءة غير صحيحة";
    setTimeout(() => {
      document.getElementById("popup").style.visibility = "hidden";
    }, 3000);

  } else if (gas_reading.value < last_gas_reading.value) {
    document.getElementById("popup").style.backgroundColor = "#e55555";
    document.getElementById("popup").style.visibility = "visible";
    document.getElementById("popup").innerHTML = "قراءة غير صحيحة";
    setTimeout(() => {
      document.getElementById("popup").style.visibility = "hidden";
    }, 3000);

  } else {
    try {
      await uploadFile()
      
      await setDoc(doc(collection(db, "gasMeterReading")), {
        customerName: name.value,
        customerAddress: address.value,
        previousReading: last_gas_reading.value,
        nowReading: gas_reading.value,
        phone: phone.value,
        imageMeterReceipt: fileUrl,
        date: `${day}/${month}/${year}`
      });

      document.getElementById("popup").style.backgroundColor = "#74e555";
      document.getElementById("popup").style.visibility = "visible";
      document.getElementById("popup").innerHTML = "تم ارسال القراءة بنجاح";
      setTimeout(() => {
        document.getElementById("popup").style.visibility = "hidden";
        window.location.href = "./gas.html";
      }, 2000);

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
