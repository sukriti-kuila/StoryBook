const express = require("express")
const router = express.Router()
const Story = require('../models/Story');
const {ensureAuth, ensureGuest} = require("../middleware/auth")
 //@desc Login page
 //@route GET /
 router.get("/", ensureGuest, (req,res)=>{
     res.render("login",{title:"Login"})
 })
//@desc Dashboard
//@route GET /dashboard
 router.get("/dashboard", ensureAuth, async (req,res)=>{
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        res.render("dashboard", {
            title: "Dashboard",
            name: req.user.firstName,
            stories
        })
    }
    catch (err)
    {
        console.log(err);
        res.render("error/500");
    }
    // res.render("dashboard", {title:"Dashboard", name:req.user.firstName})
})

module.exports = router;