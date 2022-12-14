const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
  .post('/',async (req,res)=>{
    try{
        const notes=await Note.getUserNotes(req.body);
        res.send(notes);
    }catch(err){
        res.status(401).send({message: err.message});

    }
  })

  .post('/create', async (req, res) => {
    try {
      let note = await Note.createNote(req.body);
      res.send({...note})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/read', async (req, res) => {
    try {
      let note = await Note.readNote(req.body);
      res.send({...note})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .put('/edit', async (req, res) => {
    try {
      let note = await Note.editNote(req.body);
      res.send({...note});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      Note.deleteNote(req.body);
      res.send({success: "Bye, my note... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  
module.exports = router;
