const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id:String,
    taskname:String,
    taskdes:String,
    status:String,
    assigned:{
        type:Boolean,
        required:true, 
    },

})

const TaskModel = mongoose.model("task",TaskSchema)

module.exports = {TaskModel}