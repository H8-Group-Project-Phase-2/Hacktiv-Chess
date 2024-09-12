const { User, Room } = require("../models/index");

class MainController {
  static async patchWinner(req, res, next) {
    try {
      const { id } = req.loginInfo;
      const user = await User.findByPk(id);
      await User.update(
        { matches: user.matches + 1, wins: user.wins + 1 },
        { where: { id } },
      );
      console.log(user);

      res.status(200).json({ message: "You Win!" });
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }
  static async patchLoser(req, res, next) {
    try {
      const { id } = req.loginInfo;
      const user = await User.findByPk(id);
      await User.update({ matches: user.matches + 1, loses: user.loses + 1 });
      res.status(200).json({ message: "You Lost!" });
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }
  static async patchDraws(req, res, next) {
    try {
      const { id } = req.loginInfo;
      const user = await User.findByPk(id);
      await User.update({ matches: user.matches + 1, draws: user.draws + 1 });
      res.status(200).json({ message: "Draw!" });
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }

  static async getUserInfo(req, res, next) {
    try {
      const { id } = req.loginInfo;
      const { userid } = req.params;
      const user = await User.findOne({
        where: { id: userid },
        attributes: { exclude: ["password"] },
      });

      if (!user) throw { name: "USER_NOT_FOUND" };

      if (id !== user.id) throw { name: "FORBIDDEN" };

      res.status(200).json(user);
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      if (error.name === "USER_NOT_FOUND") {
        statusCode = 404;
        message = "User not found";
      }
      if (error.name === "FORBIDDEN") {
        statusCode = 403;
        message = "You are not authorized";
      }
      res.status(statusCode).json({ message });
    }
  }

  static async postRoom(req, res, next) {
    try {
      const { password } = req.body;
      const { id } = req.loginInfo;
      const room = await Room.create({ HostId: id, password });

      res.status(201).json(room);
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }

  static async patchJoinRoom(req, res, next) {
    try {
      const { id } = req.loginInfo;
      const { roomid } = req.params;
      const { password } = req.body;

      const room = await Room.findByPk(roomid);

      if (password !== room.password) throw { name: "INVALID" };

      await Room.update(
        { OpponentId: id, status: "Playing" },
        { where: { id: roomid } },
      );
      res.status(200).json({ message: "Match Start!", room });
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      if (error.name === "INVALID") {
        statusCode = 401;
        message = "Incorrect password";
      }
      res.status(statusCode).json({ message });
    }
  }

  static async getRooms(req, res, next) {
    try {
      const rooms = await Room.findAll({
        where: {
          status: "Waiting",
        },
        include: {
          model: User,
          as: "Host ID",
          attributes: {
            exclude: ["password"],
          },
        },
      });

      res.status(200).json(rooms);
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }

  static async getRoom(req, res, next) {
    try {
      const { roomId } = req.params;
      const room = await Room.findByPk(roomId, {
        include: [
          {
            model: User,
            as: "Host ID",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: User,
            as: "Opponent ID",
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });
      res.status(200).json(room);
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }
}

module.exports = MainController;
