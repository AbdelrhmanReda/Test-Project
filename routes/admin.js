const express = require("express"),
model = require("../models/admin.js"),
  jwt = require("jsonwebtoken"),
  config = require("config"),
  router = express.Router()

router.post("/", async (req, res) => {
  // check email
  let admin = await model.findOne({ mail: req.body.mail }).exec();
  console.log(mail)
  if (!admin) res.status(400).send("user not found");
  if (admin.password != req.body.password) res.send("invalid mail or password");

  const token = jwt.sign({ id: admin._id, role: admin.role },config.get('jwtsec'));
  res.header("auth-token",token)
  res.send(token);
});
module.exports = router;
