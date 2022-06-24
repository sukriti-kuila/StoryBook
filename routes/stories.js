const express = require("express")
const router = express.Router()
const Story = require('../models/Story');
const {ensureAuth} = require("../middleware/auth")
 //@desc Show add page
 //@route GET /stories/add
 router.get("/add", ensureAuth, (req,res)=>{
     res.render("stories/add",{title:"Add Story"})
})

//@desc Show all stories
 //@route GET /stories
 router.get("/", ensureAuth, async (req,res)=>{
    try {
        const stories = await Story.find({status: "public"})
        .populate("user")
        .sort({createdAt: "desc"})
        .lean()

        res.render("stories/index", {title:"Public Stories", stories})
    }
    catch (err)
    {
        console.log(err);
        res.render("error/500");
    }
})

router.get("/:id", (req,res)=>{
    const id = req.params.id;
    Story.findById(id)
    .then (result =>{
        res.render("stories/details", {title:result.title, story: result})
    })
    .catch(err => console.log(err));
})
//@desc  Process add form
 //@route POST /stories
 router.post("/", ensureAuth, async (req,res)=>{
    try {
        req.body.user = req.user.id;
        await Story.create(req.body)
        res.redirect("/dashboard")
    }
    catch (err)
    {
        console.log(err);
        res.render('error/500');
    }
})



module.exports = router;