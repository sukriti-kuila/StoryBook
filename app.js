const express = require("express")
// const mongoose = require("mongoose");
const path = require("path")
const dotenv = require("dotenv")
const morgan = require("morgan")
const session = require("express-session")
const MongoStore = require ("connect-mongo");
const passport = require("passport")
const dbURI = process.env.MONGO_URI;
//!Express
const app = express()
//!Body Parser Middileware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
//!Load config
dotenv.config({path: "./config/config.env"})
//!Passport config
require("./config/passport")(passport) 
//! Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false, // don't create a session untill something is stored
    store:  MongoStore.create({
      mongoUrl: "mongodb+srv://sukriti:98Sj4B3fzXQxxEH@cluster0.utfp6.mongodb.net/storybooks?retryWrites=true&w=majority"
  })
  }))
//!Passport middleware
app.use(passport.initialize())
app.use(passport.session())
//!Database connection
const connectDB = require("./config/db")
const { default: mongoose } = require("mongoose")
connectDB;
//!Morgan 
app.use(morgan("dev"))
//!View engine
app.set("view engine", "ejs")
//!Static files
app.use(express.static(path.join(__dirname, "public")))
//!Routes
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/stories", require("./routes/stories"))
//!Might be needed for future
// const PORT = process.env.PORT || 3000  
// app.listen(PORT, 
// console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
app.listen(3000, () => console.log(`Server running on port 3000`))