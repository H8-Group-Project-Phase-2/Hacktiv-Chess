const express = require("express");
const cors = require("cors");
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { Room } = require("./models/index");
const { Chess } = require("chess.js");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("initialize", async (roomId) => {
    socket.join(roomId);
    const { fen } = await Room.findByPk(roomId);
    io.to(roomId).emit("initialFen", fen);
  });

  socket.on("currentPosition", async (fen, roomId) => {
    await Room.update({ fen }, { where: { id: roomId } });
    io.to(roomId).emit("updatePosition", fen);
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
app.post("/rooms", MainController.postRoom); //create room
app.get("/rooms", MainController.getRooms);
app.get("/rooms/:roomId", MainController.getRoom);
app.patch("/rooms/:roomid", MainController.patchJoinRoom);

const port = 3000;
server.listen(port, () => {
  console.log("Berlari di port", port);
});
