const { User } = require("../models/index");

class AuthControllers {
  static async postRegister(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });

      res.status(200).json({ message: "Register success" });
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        statusCode = 400;
        message = error.errors[0].message;
      }
      res.status(statusCode).json({ message });
    }
  }
}

module.exports = AuthControllers;
