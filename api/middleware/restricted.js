const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

const restricted = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    !token && next({ status: 401, message: "Token required" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return next({
          status: 401,
          message: "Token invalid",
          realErrorMessage: err.message,
        });
      }
      req.decodedJwt = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  restricted,
};