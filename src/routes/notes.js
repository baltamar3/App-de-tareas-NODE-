const express = require('express');
const router = express.Router();
const Note= require('../models/notes')

router.get('/add', (req, res) => {
  res.render("notes/new-note")
});

router.post("/new-note",async(req,res)=>{
  const {title, description}=req.body;
  errors=[]
  if(!title){
    errors.push({msj: "Please, write a title"})
  }
  if(!description){
    errors.push({msj: "Please, write a description"})
  }
  if(errors.length>0){
    res.render("notes/new-note",{
      errors,
      title,
      description
    })
  }
  else{
    const note=new Note(req.body)
    await note.save()
    res.send("ok")
  }
})


module.exports = router