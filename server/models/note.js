const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS notes (
    noteID INT NOT NULL AUTO_INCREMENT,
    noteContent VARCHAR(255) NOT NULL UNIQUE,
    CONSTRAINT notePK PRIMARY KEY(noteID)
    CONSTRAINT userFK FOREIGN KEY(userID) REFERENCES users(userID)
  ); `
  await con.query(sql);
}
createTable();

// Create  Note
async function createNote(note) {
    const sql = `INSERT INTO notes (noteContent)
      VALUES ("${note.noteContent}");
    `
    await con.query(sql);
  }

// Read Note
async function readNote(note) {
    let cNote = await getNote(note);
    
    if(!cNote[0]) throw Error("Note not found");
  
    return cNote[0].noteContent;
  }
  
// Update Note
async function editNote(note) {
    let sql = `UPDATE notes 
      SET noteContent = "${note.noteContent}"
      WHERE noteID = ${note.noteID}
    `;
  
    await con.query(sql);
    let updatedNote = await getNote(note);
    return updatedNote[0];
  }
  
// Delete Note
async function deleteNote(note) {
    let sql = `DELETE FROM notes
      WHERE noteID = ${note.noteID}
    `
    await con.query(sql);
  }

// Useful Functions
async function getNote(note) {
    let sql;
  
    if(note.noteID) {
      sql = `
        SELECT * FROM notes
         WHERE noteID = ${note.noteID}
      `
    }
    return await con.query(sql);  
  }

  module.exports = { createNote, readNote, editNote, deleteNote};