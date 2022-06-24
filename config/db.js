const mongoose = require("mongoose");
const dbURI = process.env.MONGO_URI;

const connectDB = mongoose.connect(dbURI)
    .then(result => console.log(`Mongodb connected`))
    .catch(err => console.log(err))
                    
    
module.exports = connectDB;