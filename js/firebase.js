 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

 import {getDatabase} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyBxL_M5su4UxDdCcVmsp0ttkchZzCMbVp4",
  authDomain: "e-services-b42be.firebaseapp.com",
  projectId: "e-services-b42be",
  storageBucket: "e-services-b42be.appspot.com",
  messagingSenderId: "899933047541",
  appId: "1:899933047541:web:1c102413b4cbe43973d3bc"
};
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
//  const storage = getStorage(app);
 const database=getDatabase(app);


 export { database,app,firebaseConfig };