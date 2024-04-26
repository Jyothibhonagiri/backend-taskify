const mongoose = require("mongoose");

const userTaskSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'auth'
   } ,
   taskId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'task'
   },
   status:String,
})

const userTask = mongoose.model("userTask",userTaskSchema)
module.exports = userTask