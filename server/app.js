const express = require("express");
const cors = require("cors");
const AuthControllers = require("./controllers/authController");
const userAuthentication = require("./middlewares/userAuthentication");
const MainController = require("./controllers/mainController");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/register", AuthControllers.postRegister);
app.post("/login", AuthControllers.postLogin);

app.use(userAuthentication);

app.patch("/winner", MainController.patchWinner);
app.patch("/loser", MainController.patchLoser);
app.patch("/draw", MainController.patchDraws);

app.listen(port, () => {
  console.log("Berlari di port", port);
});
