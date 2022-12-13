import { fetchData, setCurrentUser } from './main.js'

class User{
    constructor(username, fullname, password, userid){
        this.userid = userid,
        this.username = username,
        this.fullname = fullname;
        this.password = password
    }

    getUserid(){
        return this.userid;
    }
    setUserid(userid){
        this.userid = userid;
    }

    getUsername(){
        return this.username;
    }
    setUsername(username){
        this.username = username;
    }

    getFullname(){
        return this.fullname;
    }
    setFullname(fullname){
        this.fullname = fullname;
    }

    getPassword(){
        return this.password;
    }
    setPassword(password){
        this.password = password;
    }

}

let registerform = document.getElementById("registerform");
if(registerform) registerform.addEventListener('submit', register);

function register(e) {
    e.preventDefault();
  
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let fullName = document.getElementById("fullname").value;
    let user = new User(userName, fullName, password);
    console.log(user);
  
    fetchData("/users/register", user, "POST")
    .then((res) => res.json())
    .then((data) => {
      setCurrentUser(data);
      console.log("does it get here");
      window.location.href = "note.html";
    })
    .catch((err) =>{
      console.log(err);
    })
  }

let loginform = document.getElementById("loginform");
if(loginform) loginform.addEventListener('submit', login);

function login(e) {
    e.preventDefault();
  
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    //let fullName = document.getElementById("fullname").value;
    let user = new User(userName, password);
  
    fetchData("/users/login", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "note.html";
    })
    .catch((err) => {
      console.log(`Error!!! ${err.message}`)
    }) 
}