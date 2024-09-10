const { User } = require("../models/index");

class MainController {
  static async patchWinner(req, res, next) {
    try {
      const { id } = req.loginInfo;
      const user = await User.findByPk(id);
      await User.update(
        { matches: user.matches + 1, wins: user.wins + 1 },
        { where: { id } },
      );
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
}

module.exports = MainController;
