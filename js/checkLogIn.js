var checkLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
console.log(checkLoggedIn);

const logOutBtn = document.getElementById("logout");
if (checkLoggedIn != null) {

  if (checkLoggedIn.loggedIn == true) {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
  } else {
    window.location.href = "./login.html";
  }

}else{
  window.location.href = "./login.html";

}


logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("userLoggedIn");
});

if (
  checkLoggedIn.admin == "ahmedmohamed26602632@gmail.com" ||
  checkLoggedIn.admin == "hanen.tawfik41@icloud.com" ||
  checkLoggedIn.admin == "admin@gmail.com" ||
  checkLoggedIn.admin == "adminw@gmail.com" ||
  checkLoggedIn.admin == "khaled.zakaria4@icloud.com" 
) {
  document.getElementById("admin").style.display = "block";
  document.getElementById("allFeeds").style.display = "block";
}else{
  document.getElementById("admin").style.display = "none";
  document.getElementById("allFeeds").style.display = "none";
}
