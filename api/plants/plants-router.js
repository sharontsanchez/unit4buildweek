const router = require("express").Router();
const Plants = require("./plants-model");
const {
  validatePlantPayload,
  checkPlantExists,
  validateNewPlantPayload,
} = require("../middleware/plants-middleware");

router.get("/", async (req, res) => {
  const plants = await Plants.find(req.decodedJwt.subject);
  res.status(200).json(plants);
});

router.get("/:plant_id", checkPlantExists, async (req, res, next) => {
  try {
    const plant = await Plants.findById(
      req.decodedJwt.subject,
      req.params.plant_id
    );
    res.status(200).json(plant);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateNewPlantPayload,
  validatePlantPayload,
  (req, res, next) => {
    try {
      Plants.addPlant(req.decodedJwt.subject, req.body)
        .then((plant) => {
          res.status(201).json(plant);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:plant_id",
  checkPlantExists,
  validatePlantPayload,

  (req, res, next) => {
    try {
      Plants.update(req.decodedJwt.subject, req.params.plant_id, req.body)
        .then((plant) => {
          res.status(200).json(plant);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:plant_id", checkPlantExists, (req, res, next) => {
  try {
    Plants.remove(req.decodedJwt.subject, req.params.plant_id)
      .then((plant) => {
        res.status(200).json(plant[0]);
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;