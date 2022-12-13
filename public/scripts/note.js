import { fetchData } from './main.js'

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

let noteform = document.getElementById("noteform");
if(noteform) noteform.addEventListener('submit', addNote);

function addNote(e){
    e.preventDefault();

    let notecontent = document.getElementById("notecontent").value;

                //same for the noteid
    note1 = new Note(1234, notecontent);

    console.log(note1);
}