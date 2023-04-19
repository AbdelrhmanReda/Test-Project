const model = require("../models/prof"),
  jwt = require("jsonwebtoken"),
  config = require("config");

let addProf = async (req, res) => {
  // console.log(req.body)
  try {
    let prof = await new model({
      PID: req.body.PID,
      pfName: req.body.pfName,
      phone1: req.body.phone1,
      phone2: req.body.phone2,
      pfMail: req.body.pfMail,
      address: { ...req.body.address },
      degree: req.body.degree,
      courses: [req.body.courses],
      salary: req.body.salary,
      password:req.body.password
    });
    prof.save();
    res.status(200).send("Added Succesfully");
  } catch (error) {
    for (let e in error.errors) {
      console.log(`errors shit ${error.errors[e].message}`);
      res.send("Bad Request");
    }
  }
};



module.exports = {
  addProf
};
