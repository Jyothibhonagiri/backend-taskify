const express = require("express");
const TaskModel = require("../models/task");
const router = express.Router();
const mongoose = require("mongoose")
const userTaskModel = require("../models/userTask");


router.get("/summary", async function(req,res){
    let TotalCount = await TaskModel.TaskModel.find({}).count();
    let AvailableTask = await TaskModel.TaskModel.find({assigned:false}).count();
    let AssignTask = await TaskModel.TaskModel.find({assigned:true}).count();
    let InProgressCount = await  userTaskModel.find({status:"InProgress"}).count();
    let completedCount = await userTaskModel.find({status:"Completed"}).count();

    res.send({TotalCount,AvailableTask,AssignTask,InProgressCount,completedCount});
})
router.get("/AvailableTask", async function(req,res){
    let tasks = await TaskModel.TaskModel.find({assigned:{"$ne":"true"}})
    /*res.status(200).json(tasks)*/
    res.send(tasks)
})

router.get("/all", async function(req,res){
    let tasks = await TaskModel.TaskModel.find({assigned:{"$ne":"true"}})
    /*res.status(200).json(tasks)*/
    res.send(tasks)
})

router.post("/create", async function(req,res){

    console.log(req.body)
    const newTaskData = new TaskModel.TaskModel({...req.body,assigned:false})
    const createdtask = await newTaskData.save();
    res.send(createdtask)
})

router.delete("/:id", async  function(req,res){
    console.log(req.params)
    const {id} = req.params;
    const deletedData = await TaskModel.TaskModel.findByIdAndDelete(id);
    res.send("data deleted successfully")
})
router.get("/:id", async function(req,res){
    const {id} = req.params;
    const task = await TaskModel.TaskModel.findById(id)
     res.send(task)
})
router.put("/update/:id", async  function(req,res){
    console.log(req.params)
    const {id} = req.params;
    const updatedTask = await TaskModel.TaskModel.updateOne({_id:new mongoose.Types.ObjectId(id)},{...req.body});
    res.send( updatedTask)
})
router.get("/:bystatus/:status", async function(req,res){
    const {status} = req.params;
    if(status==="All"){
        let task = await TaskModel.TaskModel.find({});
        return res.send(task)
    }else{
        const task = await TaskModel.TaskModel.find({status:status})
        return res.send(task)
    }
  
})


module.exports = router