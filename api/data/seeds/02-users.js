const bcrypt = require("bcryptjs");

const hash = bcrypt.hashSync("password", 8);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Lisa", password: hash, phone_number: "123-456-7890" },
        { username: "Mark", password: hash, phone_number: "123-456-7891" },
        { username: "Jessica", password: hash, phone_number: "123-456-7892" },
        { username: "Peter", password: hash, phone_number: "123-456-7893" },
      ]);
    });
};