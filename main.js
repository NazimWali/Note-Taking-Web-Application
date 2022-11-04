class User{
    constructor(userid, username, fname, lname, password){
        this.userid = userid,
        this.username = username,
        this.firstname = fname,
        this.lastname = lname,
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

    getFirstname(){
        return this.firstname;
    }
    setFirstname(fname){
        this.firstname = fname;
    }

    getLastname(){
        return this.lastname;
    }
    setLastname(lname){
        this.lastname = lname;
    }

    getPassword(){
        return this.password;
    }
    setPassword(password){
        this.password = password;
    }

}

class Note{
    constructor(noteid, notecontent){
        this.noteid = noteid;
        this.notecontent = notecontent;
    }

    getNoteid(){
        return this.noteid;
    }
    setNoteid(noteid){
        this.noteid = noteid;
    }

    getNotecontent(){
        return this.notecontent;
    }
    setNotecontent(notecontent){
        this.notecontent = notecontent;
    }

}

let registerform = document.getElementById("registerform");
if(registerform) registerform.addEventListener('submit', addUser);

function addUser(e){
    e.preventDefault();

    let username = document.getElementById("username").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let password = document.getElementById("password").value;

                //I know the user id shouldn't really be hard coded in like that
    user1 = new User(1234, username, fname, lname, password);
    console.log(user1);

}

let loginform = document.getElementById("loginform");
if(loginform) loginform.addEventListener('submit', logUser);

function logUser(e){
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    console.log(username);
    console.log(password);
}

let noteform = document.getElementById("noteform");
if(noteform) noteform.addEventListener('submit', addNote);

function addNote(e){
    e.preventDefault();

    let notecontent = document.getElementById("notecontent").value;

                //same for the noteid
    note1 = new Note(1234, notecontent);

    console.log(note1);
}