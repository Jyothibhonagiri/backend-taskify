const express = require("express");
const userTaskModel = require("../models/userTask");
const router = express.Router();
const mongoose = require("mongoose")
const TaskModel = require("../models/task");
const Authmodel = require("../models/auth");
const userTask = require("../models/userTask");

router.get("/summary/:userId", async function(req,res){
  let InProgressCount = await userTaskModel.find({$and:[{status:"InProgress"},{userId:req.params.userId}]}).count();
  let completedCount = await userTaskModel.find({$and:[{status:"Completed"}]}).count();
  res.send({InProgressCount,completedCount});
})

router.get("/MyTask/:userId",async function(req,res){
   let myTask = await userTaskModel.find({userId:req.params.userId}).populate("taskId","taskname  taskdes").exec();
   res.send(myTask)
})


router.get("/:userId/byStatus/:status",async function(req,res){
  const {status} = req.params;
  if(status==="All"){
      let task = await userTaskModel.find({userId:req.params.userId}).populate("taskId","taskname  taskdes").exec();
      return res.send(task)
  }else{
      const task = await userTaskModel.find({$and:[{userId:req.params.userId},{status:req.params.status}]}).populate("taskId","taskname  taskdes").exec();
      return res.send(task)
  }
})

router.post("/assignTask",async function(req,res){
    const {taskId,userId,status} = req.body
  const task = await TaskModel.TaskModel.findById(taskId);
  const user = await Authmodel.Authmodel.findById( userId);

  if( task && user){
    const newUserTask = new userTaskModel(req.body)
    const createduserTask = await newUserTask.save();
    res.send(createduserTask)
    task.assigned = true;
    task.save();
  }else{
    res.send("user not exist")
  }
})


router.put("/completeTask", async function(req,res){
  const {id,status} = req.body
  const updatedTask = await userTaskModel.updateOne({_id:new mongoose.Types.ObjectId(id)},{status:status})
  res.send(updatedTask)
})

module.exports = router