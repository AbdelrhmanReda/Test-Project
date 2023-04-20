const jwt = require("jsonwebtoken"),
  config = require("config");
module.exports = (req, res, nxt) => {
  // get header
  const token = req.header("auth-token");
  if (!token) res.status(401).send("Access Denied..");
  const decodedToken = jwt.verify(token, config.get("jwtsec"));
  const role = decodedToken.role;
  if (!role == "student" || !role == "admin") res.send("Access Denied..");
  nxt();
};
