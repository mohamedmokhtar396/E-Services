
import { app } from "./firebase.js";
import {getDatabase,get,remove,set,ref,child,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc,query,where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
const db = getFirestore(app);
const database = getDatabase(app);











let board_content=document.querySelector('.board-content')
let popup= document.getElementById("popup")


let content=``



// ************************************************
// gas 
// ************************************************

// gas read
import { Gas_read } from "./GAS_Admin.js";
Gas_read()

// gas service
import { Gas_service } from "./GAS_Admin.js";
Gas_service()

// gas request contract
import { Gas_contract } from "./GAS_Admin.js";
Gas_contract()

// gas cancel contract
import { Gas_cancelContract } from "./GAS_Admin.js";
Gas_cancelContract()




// ************************************************
// Electric
// ************************************************

// elec Read
import { ELEC_Read } from "./ELEC_Admin.js";
ELEC_Read()

// elec service
import { ELEC_service } from "./ELEC_Admin.js";
ELEC_service()

// elec request contract
import { ELEC_contract } from "./ELEC_Admin.js";
ELEC_contract()

// elec cancel contract
import { ELEC_cancelContract } from "./ELEC_Admin.js";
ELEC_cancelContract()



// ************************************************
// water 
// ************************************************

// water read 
import { Water_read } from "./WATER_Admin.js";
Water_read()

// water service 
import { Water_service } from "./WATER_Admin.js";
Water_service()

// water request contract 
import { Water_contract } from "./WATER_Admin.js";
Water_contract()

// water cancel contract 
import { Water_cancelContract } from "./WATER_Admin.js";
Water_cancelContract()

