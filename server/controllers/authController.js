const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class AuthControllers {
  static async postRegister(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });

      res.status(201).json({ message: "Register success" });
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

  static async postLogin(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) throw { name: "INPUTREQ" };

      const user = await User.findOne({ where: { username } });
      if (!user) throw { name: "INVALID" };

      if (!compare(password, user.password)) throw { name: "INVALID" };

      const payload = {
        id: user.id,
        username: user.username,
      };

      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";
      if (error.name === "INPUTREQ") {
        statusCode = 400;
        message = error.errors[0].message;
      }
      if (error.name === "INVALID") {
        statusCode = 401;
        message = "Invalid Username/ Password";
      }

      res.status(statusCode).json({ message });
    }
  }
}

module.exports = AuthControllers;
