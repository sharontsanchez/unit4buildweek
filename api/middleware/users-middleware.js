const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const checkUserPayload = async (req, res, next) => {
  try {
    const { username, password, phone_number } = req.body;
    if (username || password || phone_number) {
      if (username) {
        const [user] = await Users.findBy({ username: username });

        if (user && user.user_id !== req.decodedJwt.subject) {
          next({ message: "username taken", status: 401 });
        }

        (username.length < 3 || username.length > 30) &&
          next({
            status: 400,
            message: "username must be between 3 and 30 caracters",
          });
      }
      if (password) {
        if (password.length < 5 || password.length > 200) {
          next({
            status: 400,
            message: "password must be between 5 and 200 caracters",
          });
        } else {
          const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
          const hash = bcrypt.hashSync(password, rounds);

          req.body.password = hash;
        }
      }
      if (phone_number) {
        (phone_number.length < 7 || phone_number.length > 15) &&
          next({
            status: 400,
            message: "phone number must be between 7 and 15 numbers",
          });
      }
      next();
    } else {
      next({
        status: 400,
        message: "please enter a username,password or phone number",
      });
    }
  } catch (err) {
    next(err);
  }
};

async function checkUserExists(req, res, next) {
  try {
    const exists = await Users.findBy({ user_id: req.decodedJwt.subject });

    if (!exists.length) {
      next({ status: 404, message: "No user found with that ID." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}
module.exports = {
  checkUserExists,
  checkUserPayload,
};