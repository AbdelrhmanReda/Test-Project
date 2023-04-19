const express = require("express"),
  router = express.Router(),
  profController = require("../controllers/pfcontroller.js"),
  authMW = require("../middlewares/adminMW"),
  model = require("../models/prof"),
  profMW = require("../middlewares/profMW"),
  jwt = require("jsonwebtoken"),
  config = require("config");

router.post("/addPF", authMW, profController.addProf);
router.get("/getProfbyId/:id", profMW, profController.getProfById);
router.delete("/deleteProf/:id", authMW, profController.deleteProf);

router.post("/signInProf", async (req, res) => {
  try {
    let prof = await model.findOne({ pfMail: req.body.pfMail }).exec();
    if (!prof) res.status(400).send("user not found");

    if (prof.password != req.body.password)
      res.send("invalid mail or password");
    console.log("hi");

    const token = jwt.sign(
      { id: prof._id, role: prof.role },
      config.get("jwtsec")
    );
    res.header("auth-token", token);
    res.send(token);
  } catch (error) {
    for (let e in error.errors) {
      console.log(error.errors[e].message);
      res.send("Bad Request");
    }
  }
});

module.exports = router;
