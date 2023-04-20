const express = require("express"),
  { urlencoded } = require("express"),
  app = express(),
  port = 4000,
  studentRouter = require("./routes/Student");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", studentRouter);
app.use("/", pfRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
