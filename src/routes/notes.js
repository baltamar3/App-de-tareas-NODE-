const express = require('express');
const router = express.Router();
const Note= require('../models/notes')

router.get('/notes/add', (req, res) => {
  res.render("notes/new-note")
});

router.post("/notes/new-note",async(req,res)=>{
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
    res.redirect("/notes")
  }
})

router.get("/notes", async(req,res)=>{
  const notes= await Note.find().sort({date: 'desc'})
  //console.log(notes);
  res.render("notes/all-notes", { notes })
})

router.get("/notes/edit/:id",(req,res)=>{
  
})


router.get("/notes/delete/:id", async(req,res)=>{
  const id= req.params.id
  await Note.findByIdAndRemove(id)
  res.render("notes/all-notes")
  console.log("Delete success")
})

module.exports = router