//import { get } from '../../server/routes/note.js';
//import { get } from '../../server/routes/note.js';
import { fetchData, getCurrentUser } from './main.js'

class Note{
    constructor(notecontent, userid, noteid){
        this.noteid = noteid;
        this.notecontent = notecontent;
        this.userid = userid;
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

    getUserid(){
        return this.userid;
    }
    setUserid(userid){
        this.userid = userid;
    }

}

let noteform = document.getElementById("noteform");
if(noteform) noteform.addEventListener('submit', addNote);

function addNote(e){
    e.preventDefault();

    let notecontent = document.getElementById("notecontent").value;
    let user = getCurrentUser();
    let note = new Note(notecontent, user.userID);
    console.log(note);

    fetchData("/notes/create", note, "POST")
    .then((data) => {
        //json.toString(data);
      console.log(data);
    })
    .catch((err) =>{
      console.log(err);
    })
}

let user = getCurrentUser();

if (user && noteform) showAllNotes();

function showAllNotes(){
    let user = getCurrentUser();
    let userid = user.userID;
    console.log(userid);

    fetchData("/notes/", user, "POST")
    .then((data) => {
        let ul=document.getElementById("allnotes");    

        data.forEach((note)=>{
            let li=document.createElement('li');
            let text=document.createTextNode(note.noteContent);
            li.appendChild(text);
            ul.appendChild(li);

        })

    })
    .catch((err)=>{
        console.log(`Error! ${err}`)
    });

//    fetchData("/notes/", user,"post")
//     .then((data)=>{
//         let ul=document.getElementById("allnotes");

//         data.forEach((note)=>{
//             let li=document.createElement('li');
//             let text=document.createTextNode(note.notecontent);
//             li.appendChild(text);
//             ul.appendChild(li);

//         })
//     })
 //    

}