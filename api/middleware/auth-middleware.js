const Users = require("../users/users-model");

const checkPayload = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { password } = req.body;
    if (!username && !password) {
      next({ status: 400, message: "username and password required" });
    } else if (username.length < 3 || username.length > 30) {
      next({
        status: 400,
        message: "username must be between 3 and 30 caracters",
      });
    } else if (password.length < 5 || password.length > 200) {
      next({
        status: 400,
        message: "password must be between 5 and 200 caracters",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Users.findBy({ username: username });
    console.log("hello");
    if (user) {
      req.user = user;

      next();
    } else {
      next({ message: "invalid credentials", status: 401 });
    }
  } catch (error) {
    next(error);
  }
};
const checkUsernameTaken = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Users.findBy({ username: username });

    if (!user.length) {
      req.user = user;
      next();
    } else {
      next({ message: "username taken", status: 401 });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  checkPayload,
  checkUsernameExists,
  checkUsernameTaken,
};