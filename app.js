const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const route = require('./src/routes/api')
const bodyParser = require('body-parser')
require('dotenv').config()
const  mongoose  = require('mongoose')


const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://mernpractice:${process.env.DB_PASSWORD}@cluster0.0uasavi.mongodb.net/ToDoPlanner?retryWrites=true&w=majority`;
const options = { user: process.env.DB_USERNAME, pass: process.env.DB_PASSWORD };

// mongodb+srv://mernpractice:mernpractice@cluster0.0uasavi.mongodb.net/?retryWrites=true&w=majority

app.use("/api/v1/", route)
app.use(rateLimit({windowMs: 15 * 60 * 1000,max: 2000}))

mongoose.connect(uri, options)
.then(()=> console.log('database connected'))
.catch((err)=> console.log(err))


// database connenction end











app.use("*", (req, res)=>{
    res.status(404).json({message: "Route not found"})
  });

  module.exports = app


    





    






