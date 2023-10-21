// define Classes, methods in classes, object model
// use memory database likes arrays, map...
const express = require("express");
//database
const studentList = [
    {"id":1, "name":"Alice", "program":"ComPro"},
    {"id":2, "name":"Bod", "program":"ComPro"},
    {"id":3, "name":"Justin", "program":"ComPro"},
    {"id":4, "name":"Mary", "program":"MBA"},

    // new Student(1, "Alice", "Compro"),
    // new Student(2, "Bod", "Compro")
];
//model
class Student {
    constructor(id, name, program) {
        this.id = id;
        this.name = name;
        this.program = program;
    }
    //methods:
    static getAllStudents() {
        return studentList;
    }

    static getSize() {
        return studentList.length;
    }

    static getStudentById(id) {
        return studentList.find(element=>element.id===id);
    }

    createStudent() {
        //let newStudent = new Student(student.id, student.name, student.program);
        studentList.push(this);
    }

    static deleteStudentById(id) {
        let index = studentList.findIndex(s => s.id === id);
        let deletedStudent;
        if (index > -1) {
            deletedStudent = studentList[index];
            studentList.splice(index, 1);
        }
        return deletedStudent;
    }

    static updateStudent(student) {
        let existing = studentList.find(s => s.id == student.id);
        if (existing) {
            existing.name = student.name;
            existing.program = student.program;
        }
        return existing;
    }

    static filterByProgram(program) {
        console.log(program);
        return studentList.filter(s=> s.program == program);
    }
}

//export Student class for this file
module.exports = Student;//model