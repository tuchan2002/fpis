const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};
