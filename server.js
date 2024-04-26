const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");

const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/task") ;
const userTaskRoutes = require("./routes/userTask")
mongoose.connect("mongodb://localhost:27017/task-app");

app.use(cors())
app.use(fileupload());
//function checktoken(req,res,next){
//    let token = req.headers.authorization
  //  if(!token){
    //   res.send("you are not allowed")
    //}else{
      //  next()
    //}
//}

app.use("/task",taskRoutes);
app.use("/auth",authRoutes);
app.use("/user/task",userTaskRoutes)

app.get("/",function(req,res){
    res.send("helloooooo world")
})


app.listen(7000,()=>{
    console.log("server is running on port 7000")
})