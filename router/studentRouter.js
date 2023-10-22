let express = require("express");
let controllerFns = require("../controller/studentController");
const router = express.Router();

//do routing here

router.get("/students/search", controllerFns.filterByProgram);
router.get("/students/:id", controllerFns.getStudentById);
router.get("/students", controllerFns.getAllStudents);
router.put("/students/:id", controllerFns.updateStudent);
router.delete("/students/:id", controllerFns.deleteStudent);
router.post("/students", controllerFns.createStudent);

//exporting router for app.js uses
module.exports = router;