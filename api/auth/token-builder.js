const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secrets/index");

module.exports = function (user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};