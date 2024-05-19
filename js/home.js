window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;

  if (scrollPosition > 500) {
    document.getElementById("scroll-up").style.display = "block";
  } else {
    document.getElementById("scroll-up").style.display = "none";
  }
});

// var checkLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
// console.log(checkLoggedIn);
// const logOutBtn=document.getElementById("logout")
// if (checkLoggedIn == true) {
//   document.getElementById("login").style.display = "none";
//   document.getElementById("logout").style.display = "block";
// }else{
//   window.location.href='./login.html'
// }
// logOutBtn.addEventListener("click", ()=>{
//     localStorage.removeItem("userLoggedIn");
// })

//   for (var i = 0; i < data.length; i++) {

//         if (data[i]. loggedIn == true) {
//             console.log('fsssssssssssssssssssirst')
//         }

// }
