const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const router = express.Router();
require("dotenv").config();

const PORT = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");

router.use(express.static(__dirname + "./public"));

app.use(express.json());
app.use(cors());

app.use("/", userRouter);

app.get("/", function (req, res) {
  res.send("User Dashboard Application");
});
mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log("server started on port no. " + PORT);
});
