const mongoose = require("mongoose");
const validator = require("validator");

mongoose
  .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
  .then(() => {})
  .catch((err) => {
    throw err;
  });

const schema = mongoose.Schema({
  SID: { type: String, required: true, unique: true },
  stdMail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
    },
  },
  sName: { type: String, required: true},
  phone1: { type: Number, required: true, unique: true, manLength: 11 },
  phone2: { type: Number, required: true, unique: true, manLength: 11 },
  fees: { type: Boolean },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number },
  },
  degree: {
    major: {
      name: { type: String },
      code: { type: String },
    },
    GPA: { type: Number },
  },
});

const registerSchema = new mongoose.model("studentSys", schema);

module.exports = registerSchema;
