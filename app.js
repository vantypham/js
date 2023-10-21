/**
 * Instructions
 *    1    Create everything from scratch for studentRegistration-server that we discussed in the lecture13.
 *    2    Inside studentRegistration-server REST application:
 *    -    implement getStudents, getStudentById, createStudent, deleteStudent, updateStudent, and filterByProgram
 *         functionality in router, controller, and model.
 *    -    Use Postman to test your REST APIs.
 * */
const express = require("express");
let studentRouter = require("./router/studentRouter");
const PORT = process.env.PORT || 3000;

const app = express();
app.enable("case sensitive routing");
//set json content
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


