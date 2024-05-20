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
let last_reading = document.getElementById("last_reading");
let reading = document.getElementById("reading");
let fileInput = document.getElementById("fileInput");
let submit = document.getElementById("submit");
let fileUrl;



submit.addEventListener("click", async function () {
  submit.style.backgroundColor = '';
  
  if (phone.value && reading.value && address.value && fileInput.files.length > 0) {
    await AddData();
  }

  if (address.value) {
    address.style.border = "2px solid black";
  } else {
    address.style.border = "2px solid red";
  }

  if (reading.value) {
    reading.style.border = "2px solid black";
  } else {
    reading.style.border = "2px solid red";
  }

  if (last_reading.value) {
    last_reading.style.border = "2px solid black";
  } else {
    last_reading.style.border = "2px solid red";
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
  const q = query(collection(db, "waterMeterReading"), where("phone", "==", phone.value));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    document.getElementById("popup").style.backgroundColor = "#e55555";
    document.getElementById("popup").style.visibility = "visible";
    document.getElementById("popup").innerHTML = "تم الرفع مسبقا علي نفس الرقم";
    setTimeout(() => {
      document.getElementById("popup").style.visibility = "hidden";
    }, 3000);

  } else if (reading.value < last_reading.value) {
    document.getElementById("popup").style.backgroundColor = "#e55555";
    document.getElementById("popup").style.visibility = "visible";
    document.getElementById("popup").innerHTML = "قراءة غير صحيحة";
    setTimeout(() => {
      document.getElementById("popup").style.visibility = "hidden";
    }, 3000);

  } else {
    try {
      await uploadFile()
      
      await setDoc(doc(collection(db, "waterMeterReading")), {
        customerName: name.value,
        customerAddress: address.value,
        previousReading: last_reading.value,
        nowReading: reading.value,
        phone: phone.value,
        imageMeterReceipt: fileUrl,
        date: `${day}/${month}/${year}`
      });

      document.getElementById("popup").style.backgroundColor = "#74e555";
      document.getElementById("popup").style.visibility = "visible";
      document.getElementById("popup").innerHTML = "تم ارسال القراءة بنجاح";
      setTimeout(() => {
        document.getElementById("popup").style.visibility = "hidden";
        window.location.href = "./WATER.html";
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
