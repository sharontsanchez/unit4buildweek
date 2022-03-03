const db = require("../data/db-config");

const find = (user_id) => {
  return db("plants").where("user_id", user_id).orderBy("plants.plant_id");
};

const findById = (user_id, plant_id) => {
  return db("plants as p")
    .where("user_id", user_id)
    .where("plant_id", plant_id)
    .first();
};
function findBy(user_id, filter) {
  return db("plants as p").where("user_id", user_id).where(filter);
}

const addPlant = (user_id, plant) => {
  plant.user_id = user_id;
  return db("plants as p").insert(plant, [
    "plant_id",
    "nickname",
    "species",
    "days_between_watering",
    "notes",
    "img_url",
    "user_id",
  ]);
};

const update = (user_id, plant_id, plant) => {
  plant.user_id = user_id;
  return db("plants as p")
    .update(plant, [
      "plant_id",
      "nickname",
      "species",
      "days_between_watering",
      "notes",
      "img_url",
      "user_id",
    ])
    .where("user_id", user_id)
    .where("plant_id", plant_id);
};

const getAllSpecies = () => {
  return db("plants");
};
const remove = (user_id, plant_id) => {
  return db("plants")
    .where("plant_id", plant_id)
    .where("user_id", user_id)
    .del([
      "plant_id",
      "nickname",
      "species",
      "days_between_watering",
      "notes",
      "img_url",
      "user_id",
    ]);
};

module.exports = {
    find,
    findById,
    update,
    getAllSpecies,
    addPlant,
    remove,
    findBy,
  };