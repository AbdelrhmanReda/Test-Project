const mongoose = require("mongoose");
const validator = require("validator");

mongoose
  .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
  .then(() => {})
  .catch((err) => {
    throw err;
  });

const schema = mongoose.Schema({
  PID: { type: String, required: true, unique: true },
  pfMail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
    },
  },
  pfName: { type: String, required: true },
  phone1: { type: Number, required: true, unique: true, manLength: 11 },
  phone2: { type: Number, required: true, unique: true, manLength: 11 },
  salary: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number },
  },
  degree: { type: String, required: true },
  courses:{type:Array , required:true },
  role: {type:String  , default:'prof'},
  password: { type: String, required: true, minLength: 10 },


});

const registerSchema = new mongoose.model("profSys", schema);

module.exports = registerSchema;

