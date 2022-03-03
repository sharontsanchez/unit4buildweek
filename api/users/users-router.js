const router = require("express").Router();
const Users = require("./users-model");
const {
  checkUserExists,
  checkUserPayload,
} = require("../middleware/users-middleware");



router.get("/", checkUserExists, (req, res, next) => {
  console.log(req.decodedJwt.subject);
  Users.findById(req.decodedJwt.subject)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.put("/", checkUserExists, checkUserPayload, async (req, res, next) => {
  try {
    const updatedUser = await Users.update(req.decodedJwt.subject, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});
router.delete("/", checkUserExists, async (req, res, next) => {
  try {
    Users.remove(req.decodedJwt.subject).then((user) => {
      res.status(200).json(user);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;