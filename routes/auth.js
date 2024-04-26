const express = require("express");
const jwt = require("jsonwebtoken");
const Authmodel = require("../models/auth");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/signup", async function (req, res) {
    const { fullname, email, password, repassword } = req.body
    let isUserExist = await Authmodel.Authmodel.findOne({ email: email })
    if (isUserExist) {
        res.send({ message: "user already exist", success: false })
    }
    const newUser = new Authmodel.Authmodel({ ...req.body, active: true })
    const createdUser = await newUser.save();
    res.send({ message: "user signup successfully", success: true })
})

router.post("/login", async function (req, res) {
    const { fullname, email, password, repassword } = req.body
    let isUserExist = await Authmodel.Authmodel.findOne({ email: email })
    if (isUserExist) {
        if (password === isUserExist.password) {
            if (isUserExist.active === false) {
                return res.send({ message: "your account has been deactivated", success: false })
            } else {
                let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, "testkey")
                return res.send({ message: "user logged successfully", success: true, token: token, email: isUserExist.email, userId: isUserExist._id, role: isUserExist.role })
            }

        } else {
            return res.send({ message: "invalid credentials", success: false })
        }
    } else {
        return res.send({ message: "user not exist", success: false })
    }

}
)

router.get("/profile/:email", async function (req, res) {
    let user = await Authmodel.Authmodel.findOne({ email: req.params.email })
    res.send(user)
})

router.get("/users", async function (req, res) {
    let users = await Authmodel.Authmodel.find({})
    res.send(users)
})

router.put("/ChangePassword", async function (req, res) {
    const { email, currentpassword, newpassword } = req.body
    let user = await Authmodel.Authmodel.findOne({ email });
    if (user) {
        user.password = newpassword;
        let updateduser = await user.save();
        res.send(updateduser)
    } else {
        res.send({ message: "user not exist", success: false })
    }
})

router.put("/active_deactivate", async function (req, res) {
    const { id, active } = req.body
    const updatedUser = await Authmodel.Authmodel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { active: active })
    res.send(updatedUser)

})

router.post("/profile", function (req, res) {
    console.log(req.files.profile.name)
    const fileName = req.files.profile.name;
    const fileData = req.files.profile;
    const uploadPath = path.join(__dirname, "../", "uploads")
    console.log(uploadPath)
    fileData.mv(uploadPath + "/" + fileName, function (err) {
        if (err)
            return res.send(err)
        res.send({ profile: fileName })
    })
})


module.exports = router