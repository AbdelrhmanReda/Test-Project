const express = require("express")
 router = express.Router() , 
 studentController = require("../controllers/studentController.js");


router.post("/add", studentController.addStudent );
router.post("/add", studentController.deleteStudent );




module.exports = router;
