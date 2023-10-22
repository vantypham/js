const express = require("express");
//import dao, model
//let Student = require("../model/student");
const Student = require("../model/student");

let controller = {
    //use Models, DAOs to define function content
    getAllStudents: function(req, res, next) {
        res.status(200).json(Student.getAllStudents());
    },

    getStudentById: function(req, res, next) {
        let id = parseInt(req.params.id);
        let student = Student.getStudentById(id);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: "NOT FOUND" });
        }
    },

    createStudent: function(req, res, next) {
        let { id, name, program } = req.body;
        if (id && name && program) {
            let newStudent = new Student(parseInt(id), name, program);
            newStudent.createStudent();
            res.status(201).json(newStudent);//created successful
        } else {
            res.status(400).json({ message: "provide all data." });
        }
    },

    deleteStudent: function(req, res, next) {
        let id = parseInt(req.params.id);
        //console.log(id, typeof id);
        let deletedStudent = Student.deleteStudentById(id);
        if (!deletedStudent) {
            res.status(404).json({ message: "NOT FOUND" });
        }
        else {
            res.status(200).json(deletedStudent);
        }
    },

    updateStudent: function(req, res, next) {
        let {name, program } = req.body;
        let id = req.params.id;
        console.log(req.body);
        let student = new Student(id, name, program);
        let updatedStudent = Student.updateStudent(student);
        if (!updatedStudent) {
            res.status(404).json({ message: "NOT FOUND" });
        }
        else {
            res.status(200).json(updatedStudent);
        }
    },

    filterByProgram: function(req, res, next) {
        let program = req.query.program;
        res.status(200).json(Student.filterByProgram(program));
    },
};


//exporting
module.exports=controller;
