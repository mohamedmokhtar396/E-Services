// // forgot_password.js
// import { app } from "./firebase.js";
// import { getAuth, updatePassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
// import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// const auth = getAuth(app);
// const database = getDatabase(app);

// const forgotPasswordForm = document.getElementById("forgotPasswordForm");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("newPassword");
// const popup = document.getElementById("popup");

// forgotPasswordForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = emailInput.value;
//     const newPassword = passwordInput.value;

//     try {
//         // Update password in Firebase Authentication
//         await updatePassword(auth.currentUser, newPassword);

//         // Update password in Realtime Database
//         const user = auth.currentUser;
//         if (user) {
//             const dt = new Date();
//             await update(ref(database, "users/" + user.uid), {
//                 password_changed_at: dt.getTime(), // You might want to record when the password was last changed
//             });

//             popup.style.backgroundColor = "#74e555";
//             popup.style.visibility = "visible";
//             popup.innerHTML = "Password updated successfully.";
//             setTimeout(() => {
//                 popup.style.visibility = "hidden";
//                 // Redirect the user or perform other actions
//             }, 3000);
//         } else {
//             popup.innerHTML = "User not found.";
//         }
//     } catch (error) {
//         // console.error(error);
//         popup.style.backgroundColor = "#e55555";
//         popup.style.visibility = "visible";
//         popup.innerHTML = error.message;
//         setTimeout(() => {
//             popup.style.visibility = "hidden";
//         }, 3000);
//     }
// });

// forgot_password.js
import { app } from "./firebase.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// const database = getDatabase(app);
const auth = getAuth(app);

const emailInput = document.getElementById("email");
const submit = document.getElementById("submit");
const popup = document.getElementById("popup");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      popup.style.backgroundColor = "#74e555";
      popup.style.visibility = "visible";
      popup.innerHTML = "تم ارسال رابط اعادة تعيين كلمة المرور";
      setTimeout(() => {
        popup.style.visibility = "hidden";
        window.location.href='./login.html';
      }, 3000);
    })
    .catch((error) => {
      popup.style.backgroundColor = "#e55555";
      popup.style.visibility = "visible";
      popup.innerHTML = error.message;
      setTimeout(() => {
        popup.style.visibility = "hidden";
      }, 3000);
    });
});
