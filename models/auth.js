const mongoose = require("mongoose")

let authSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    repassword:String,
    role:String,
    active:Boolean,
})

const Authmodel = mongoose.model("auth", authSchema)
module.exports ={Authmodel}
