const mongoose = require("mongoose");
const validator = require("validator");
let config = require("config")
mongoose
  .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
  .then(() => {})
  .catch((err) => {
    throw err;
  });

const schema = mongoose.Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
    },
  },
  password: { type: String, required: true, minLength: 10 },
  role: { type: String, default: "admin" },
});

const registerSchema = new mongoose.model("adminSys", schema);

// registerSchema.methods("getAuthToken", () => {
//   const token = jwt.sign(
//     { id: this._id, role: this.role },
//     config.get("jwtsec")
//   );
//   return token ; 
// });
module.exports = registerSchema;
