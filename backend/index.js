const express = require('express');
const app = express();
const path = require('path')
const dirPath = path.join(__dirname, 'backend')
require('dotenv').config();

app.get('/',(req,res)=>{
    res.sendFile(dirPath + "./index.html")
})

app.listen (process.env.PORT, ()=>{
    console.log("server is running on port 3000");
})