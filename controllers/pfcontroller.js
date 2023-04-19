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

let updateProf = async(req,res)=>{
  let prof = await model.findOneAndUpdate(req.params.id, req.body, {
    returnOriginal: false,
  });
  res.send(req.body)
}

let deleteProf = async (req, res) => {
  try{
  let prof = await model.findOneAndRemove(req.params.id);
  if (!prof) res.status(404).send("Not deleted");
  res.send(std);
}
  catch(err){
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.send("Bad Request");
  }
}}
let getProfById = async (req, res) => {
  let prof = await model.findById(req.params.id);
    res.send(prof)
    // console.log(prof)
};

module.exports = {
  addProf,
  deleteProf,
  getProfById
};
