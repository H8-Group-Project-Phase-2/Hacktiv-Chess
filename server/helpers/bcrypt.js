const bcrypt = require("bcryptjs");

const hash = (password) => {
  return bcrypt.hashSync(password);
};

const compare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = { hash, compare };
