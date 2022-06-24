const express = require("express");
const passport = require("passport");
const router = express.Router();
//!@desc     Auth with Google
//!@route    GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
//!@desc    Google auth callback
//!@route   GET /auth/google/callback
router.get("/google/callback", passport.authenticate("google",{failureRedirect: "/"}), (req,res)=>{
    res.redirect("/dashboard");
})

//!@desc    log out user
//!@route   GET /auth/logout
router.get("/logout", (req,res)=>{
    req.logout(); // in passport middileware once we login we'll have logout method on the req object
    res.redirect("/");
});
module.exports = router;