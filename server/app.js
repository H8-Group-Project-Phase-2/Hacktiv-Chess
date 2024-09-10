const express = require("express");
const cors = require("cors");
const AuthControllers = require("./controllers/authController");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/register", AuthControllers.postRegister);

app.listen(port, () => {
  console.log("Berlari di port", port);
});
