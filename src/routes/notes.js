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

//Edit
router.get("/notes/edit/:id",async(req,res)=>{
  const {id}= req.params
  const note= await Note.findById(id);
  //console.log(description);
  res.render("notes/edit-note",{ note })
})

router.post("/notes/edit/:id",async(req,res)=>{
  const {id}= req.params
  const {title, description}= req.body
  //console.log(description);
  await Note.findByIdAndUpdate(id,{title,description})
  res.redirect("/notes")
})



//DELETE
router.get("/notes/delete/:id", async(req,res)=>{
  const id= req.params.id
  await Note.findByIdAndDelete(id)
  res.redirect("/notes")
  console.log("Delete success")
})

module.exports = router