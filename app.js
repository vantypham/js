const express = require("express");
const cors = require('cors');
let studentRouter = require("./router/studentRouter");
const PORT = 5001;

const app = express();
app.enable("case sensitive routing");
//set json content
app.use(cors());
app.use(express.json());
app.use(studentRouter);



//handling exception
app.use((req,res,next)=>{
    res.status(404).json({'message': "404 NOT FOUND"});
})
app.use((err,req,res,next)=>{
    res.status(500).json({message: "Internal Server Error " + err.message});
})
//boot up
app.listen(PORT, ()=>{
    console.log("server is starting on port " + PORT);
})


