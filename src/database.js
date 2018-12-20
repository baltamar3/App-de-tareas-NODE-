const mongoose= require('mongoose')
mongoose.connect("mongodb://localhost/app-tareas-db",
{   useNewUrlParser:true,
    //useCreateIndex:true,
    //useFindAndModify:false
})
        .then(msj => console.log("db connected"))
        .catch(err => console.error(err))