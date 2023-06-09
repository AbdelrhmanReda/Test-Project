const express = require("express"),
  router = express.Router(),
  studentController = require("../controllers/studentController.js"),
  authMW = require("../middlewares/adminMW.js"),
  model = require("../models/student.js"),
  jwt = require("jsonwebtoken");
stdMW = require("../middlewares/stdMW.js");
config = require("config");
router.post("/add", authMW , studentController.addStudent);
router.get("/getStudentID/:id", stdMW, studentController.getStudentById);
router.get("/getStudents", authMW, studentController.getAllStudents);
router.post("/update/:id", authMW, studentController.updateStudent);
router.delete("/delete/:id", authMW, studentController.deleteStudent);
router.get("/getStdMail", stdMW, studentController.getStudentbyMail);
router.post("/signInStd", async (req, res) => {
  let student = await model.findOne({ stdMail: req.body.mail });
  // console.log(student);
  if (!student) res.status(400).send("user not found");
  if (student.password != req.body.password)
    res.send("invalid mail or password");

  const token = jwt.sign(
    { id: student._id, role: student.role },
    config.get("jwtsec")
  );
  res.header("auth-token", token);
  res.send(token);
});

module.exports = router;
