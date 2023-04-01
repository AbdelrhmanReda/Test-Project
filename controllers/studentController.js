const model = require("../models/student.js"),
  jwt = require("jsonwebtoken"),
  config = require("config");

// add student
let addStudent = async (req, res) => {
  // console.log(req.body)
  try {
    let std = await new model({
      SID: req.body.SID,
      sName: req.body.sName,
      phone1: req.body.phone1,
      phone2: req.body.phone2,
      stdMail: req.body.stdMail,
      fees: req.body.fees,
      address: { ...req.body.address },
      degree: { ...req.body.degree },
    });
    std.save();
    res.status(200).send("Added Succesfully");
  } catch (error) {
    for (let e in error.errors) {
      console.log(error.errors[e].message);
      res.send("Bad Request");
    }
  }
};

// get student by ID
let getStudentById = async (req, res) => {
  let std = await model.findById(req.params.id);
  // console.log(std);
  res.send(std)
};


module.exports = {
  addStudent
};
