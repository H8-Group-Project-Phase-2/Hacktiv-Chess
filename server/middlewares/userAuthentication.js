const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const userAuthentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "UNAUTHENTICATED" };

    const token = authorization.split(" ")[1];

    const payload = verifyToken(token);

    const user = await User.findByPk(payload.id);

    req.loginInfo = {
      id: user.id,
      username: user.username,
    };

    next();
  } catch (error) {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (error.name === "UNAUTHENTICATED") {
      statusCode = 401;
      message = "Invalid token";
    }
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      statusCode = 401;
      message = "Invalid token";
    }
    res.status(statusCode).json({ message });
  }
};

module.exports = userAuthentication;
