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
// app.use(express.json())


const uri =`mongodb+srv://mernpractice:<password>@cluster0.0uasavi.mongodb.net/FirstTask?retryWrites=true&w=majority`

const options = {user:"mernpractice", pass:"mernpractice"}

mongoose.connect(uri, options)
.then(()=>{console.log("database connected");})
.catch((err)=>{console.log(err)})



// database connenction end











app.use("*", (req, res)=>{
    res.status(404).json({message: "Route not found"})
  });

  module.exports = app


    
  //  http://localhost:8000/api/v1




    






