const Plants = require("../plants/plants-model");

const checkPlantExists = async (req, res, next) => {
  try {
    const exists = await Plants.findById(
      req.decodedJwt.subject,
      req.params.plant_id
    );

    if (exists) {
      req.plant = exists;
      next();
    } else {
      next({ status: 404, message: "No plant found with that ID." });
    }
  } catch (error) {
    next(error);
  }
};

const validateNewPlantPayload = async (req, res, next) => {
  try {
    const { nickname, species, days_between_watering } = req.body;
    if (nickname && species && days_between_watering) {
      next();
    } else {
      next({
        status: 400,
        message:
          "nickname, species, and days_between_watering are all required",
      });
    }
  } catch (err) {
    next(err);
  }
};

const validatePlantPayload = async (req, res, next) => {
  try {
    const { nickname, species, days_between_watering, notes, img_url } =
      req.body;

    if (nickname || species || days_between_watering || notes || img_url) {
      if (nickname) {
        if (nickname.length < 3 || nickname.length > 30) {
          next({
            status: 400,
            message: "nickname must be between 3 and 30 caracters",
          });
        }
        const [plant] = await Plants.findBy(req.decodedJwt.subject, {
          nickname: nickname,
        });
        if (plant != undefined && !(plant.plant_id == req.params.plant_id)) {
          next({ message: "nickname taken", status: 401 });
        }
      }
      if (species && (species.length < 3 || species.length > 100)) {
        next({
          status: 400,
          message: "species must be between 3 and 100 caracters",
        });
      }
      if (days_between_watering && typeof days_between_watering !== "number") {
        next({
          status: 400,
          message: "Days Between Watering must be a number",
        });
      }
      if (notes && notes.length > 250) {
        next({
          status: 400,
          message: "nickname must be less than 250 caracters",
        });
      }
    } else {
      next({
        status: 400,
        message:
          "please enter a nickname, species, days_between_watering, notes or img_url",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validatePlantPayload,
  checkPlantExists,
  validateNewPlantPayload,
};