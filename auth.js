function login() {
  const name = document.getElementById("name").value;
  const unit = document.getElementById("unit").value;
  if (!name || !unit) {
    alert("請填寫姓名與單位");
    return;
  }
  const user = { name, unit };
  localStorage.setItem("ems_user", JSON.stringify(user));
  location.href = "lobby.html";
}
function getUser() {
  return JSON.parse(localStorage.getItem("ems_user"));
}
