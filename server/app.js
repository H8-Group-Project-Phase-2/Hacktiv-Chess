const express = require("express");
const cors = require("cors");
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("join", (roomId) => {
    socket.join(roomId)
    console.log(`someone joined room ${roomId}`)
  });

  socket.on("position:new", (roomId, move) => {
    console.log(roomId)
    console.log(move)

    if (!io.sockets.adapter.rooms.has(roomId)) {
      console.error(`Room ${roomId} does not exist.`);
      return;
    }

    console.log(`Received move for room ${roomId}:`, move);
    io.to(roomId).emit("position:update", move);
  });
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const AuthControllers = require("./controllers/authController");
app.post("/register", AuthControllers.postRegister);
app.post("/login", AuthControllers.postLogin);

const userAuthentication = require("./middlewares/userAuthentication");
app.use(userAuthentication);

const MainController = require("./controllers/mainController");
app.get("/user/:userid", MainController.getUserInfo);
app.patch("/winner", MainController.patchWinner);
app.patch("/loser", MainController.patchLoser);
app.patch("/draw", MainController.patchDraws);
app.post("/rooms", MainController.postRoom);
app.get("/rooms", MainController.getRooms);
app.get("/rooms/:roomId", MainController.getRoom);
app.patch("/rooms/:roomid", MainController.patchJoinRoom);

const port = 3000;
server.listen(port, () => {
  console.log("Berlari di port", port);
});
