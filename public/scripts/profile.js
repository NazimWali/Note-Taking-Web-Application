import { fetchData, getCurrentUser, removeCurrentUser, setCurrentUser } from './main.js'

let user = getCurrentUser();
if (!user) {
    window.location.href = "login.html";
}
else updateWelcomeMessage(user.fullName);

var edits = document.getElementById("editform");
if (edits) edits.style.display = "none";

function updateWelcomeMessage(fullname){
    let welcome = document.getElementById("welcome");
    welcome.innerHTML = `Welcome back ${fullname}!`;
}


let deletebtn = document.getElementById("delete");
if (deletebtn) deletebtn.addEventListener('click', deleteAccount);

function deleteAccount(){
    if(confirm(`Are you sure you want to delete your account? All of your info and saved notes will be lost with no way to be restored.`)) {
        fetchData("/users/delete", user, "DELETE")
        .then((data) => {
            removeCurrentUser();
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
}

let editProfile = document.getElementById("showedit");
if (editProfile) editProfile.addEventListener('click', toggleEdits);

function toggleEdits(e) {
    e.preventDefault();

    var edits = document.getElementById("editform");
    if (edits.style.display === "none") {
        edits.style.display = "block";
    } else {
        edits.style.display = "none";
    }
}

let editForm = document.getElementById("editform");
if(editForm) editForm.addEventListener('submit', editUser);

function editUser(e) {

  let username = document.getElementById("username").value;
  user.username = username;

  let fullname = document.getElementById("fullname").value;
  user.fullname = fullname;

  console.log(user.username);
  updateWelcomeMessage(user.fullName);

  fetchData("/users/edit", user, "PUT")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "profile.html";

  })
  .catch((err)=> {
    console.log(err);
  })

  alert("Your profile has been updated.");

}