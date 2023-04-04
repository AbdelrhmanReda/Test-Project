const express = require("express")
 router = express.Router() , 
 studentController = require("../controllers/studentController.js");


router.post("/add", studentController.addStudent );
router.post("/add", studentController.deleteStudent );
router.get("/getStudentID/:id" , studentController.getStudentById);




module.exports = router;
