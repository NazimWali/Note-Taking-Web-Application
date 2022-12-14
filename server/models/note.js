const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS notes (
    noteID INT NOT NULL AUTO_INCREMENT,
    noteContent VARCHAR(255) NOT NULL,
    userID INT NOT NULL,
    CONSTRAINT notePK PRIMARY KEY(noteID),
    CONSTRAINT noteFK FOREIGN KEY(userID) REFERENCES users(userID)
  ); `
  await con.query(sql);
}
createTable();

// Create  Note
async function createNote(note) {
    const sql = `INSERT INTO notes (noteContent, userID)
      VALUES ("${note.notecontent}", "${note.userid}");
    `
    await con.query(sql);
  }

// Read Note
async function readNote(note) {
    let cNote = await getNote(note);
    
    if(!cNote[0]) throw Error("Note not found");
  
    return cNote[0].notecontent;
  }
  
// Update Note
async function editNote(note) {
    let sql = `UPDATE notes 
      SET noteContent = "${note.notecontent}"
      WHERE noteID = ${note.noteid}
    `;
  
    await con.query(sql);
    let updatedNote = await getNote(note);
    return updatedNote[0];
  }
  
// Delete Note
async function deleteNote(note) {
    let sql = `DELETE FROM notes
      WHERE noteID = ${note.noteid}
    `
    await con.query(sql);
  }

// Useful Functions
async function getNote(note) {
    let sql;
  
    if(note.noteID) {
      sql = `
        SELECT * FROM notes
         WHERE noteID = ${note.noteid}
      `
    }
    return await con.query(sql);  
  }

async function getUserNotes(note) {
    let sql;
    console.log(note.userID);
    if(note.userID) {
      sql = `
        SELECT * FROM notes
         WHERE userID = ${note.userID}
      `
    }
    else{
      sql = `
      SELECT * FROM notes
       WHERE noteID = ${note.noteid}
    `
    }
    return await con.query(sql);  
  }


  module.exports = { createNote, readNote, editNote, deleteNote, getUserNotes};