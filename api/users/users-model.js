const db = require("../data/db-config");

function getAllUsers() {
  return db("users")
    .select("user_id", "username", "phone_number")
    .orderBy("user_id");
}

function findBy(filter) {
  return db("users as u").where(filter);
  //.select("u.user_id", "u.username", "u.password", "u.phone_number");
}

async function findById(user_id) {
  const plants = await db("users as u")
    .leftJoin("plants as p", "u.user_id", "p.user_id")
    .where("u.user_id", user_id)
    .orderBy("p.plant_id");

  //.orderBy("p.plant_id");
  if (!plants.length) return undefined;
  console.log(plants);
  const finObj = {
    user_id: user_id,
    username: plants[0].username,
    phone_number: plants[0].phone_number,
    plants: [],
  };

  plants[0].plant_id &&
    plants.forEach((plant) => {
      finObj.plants.push({
        plant_id: plant.plant_id,
        nickname: plant.nickname,
        species: plant.species,
        days_between_watering: plant.days_between_watering,
        notes: plant.notes,
        img_url: plant.img_url,
      });
    });
  return finObj;
}

async function add(user) {
  const [newUserObject] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
    "phone_number",
  ]);
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

async function update(user_id, user) {
  const [updatedUser] = await db("users")
    .update(user, ["user_id", "username", "phone_number"])
    .where("user_id", user_id);
  return updatedUser;
}

async function remove(user_id) {
  const [deletedUser] = await db("users")
    .del(["user_id", "username", "phone_number"])
    .where("user_id", user_id);
  return deletedUser;
}

module.exports = {
  add,
  getAllUsers,
  findBy,
  findById,
  update,
  remove,
};