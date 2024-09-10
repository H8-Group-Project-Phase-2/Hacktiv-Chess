const express = require("express");
const cors = require("cors");
const app = express();
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on("connection", (socket) => {

  socket.on("position:new", move => {
    socket.broadcast.emit("position:update", move)
  })

})

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const AuthControllers = require("./controllers/authController");
app.post("/register", AuthControllers.postRegister);
app.post("/login", AuthControllers.postLogin);

const userAuthentication = require("./middlewares/userAuthentication");
app.use(userAuthentication);

const MainController = require("./controllers/mainController");
app.patch("/winner", MainController.patchWinner);
app.patch("/loser", MainController.patchLoser);
app.patch("/draw", MainController.patchDraws);



const port = 3000;
server.listen(port, () => {
  console.log("Berlari di port", port);
});
