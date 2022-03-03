exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("plants")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("plants").insert([
          {
            nickname: "Luisa",
            species: "Devil's Ivy (Pothos)",
            days_between_watering: 1,
            notes:
              "¿Por qué usted me hace preguntas si usted nunca entiende las respuestas?",
            img_url:
              "https://unsplash.com/photos/gTMnUAkPvlQ",
            user_id: 2,
          },
  
          {
            nickname: "Maribel",
            species: "Peace Lily",
            days_between_watering: 4,
            notes:
              "These lovely plants not only brighten up a living space, but are also excellent at cleaning the air of the room. They enjoy medium to low light",
            img_url: "https://unsplash.com/photos/CDoPIWJDvvw",
            user_id: 3,
          },
          {
            nickname: "Alejandro",
            species: "Spider Plant",
            days_between_watering: 1,
            notes:
              "The most adaptable of houseplants and the easiest to grow. They enjoy cooler temperatures and benefit from occassional pruning",
            img_url: "https://unsplash.com/photos/7-6iniVCEvk",
            user_id: 3,
          },
          {
            nickname: "Seema",
            species: "Succulent",
            days_between_watering: 2,
            img_url: "https://unsplash.com/photos/ncQ2sguVlgo",
            user_id: 2,
          },
          {
            nickname: "Pooja",
            species: "Mexican Marigold",
            days_between_watering: 2,
            img_url: "https://unsplash.com/photos/2j8X-RpB1sM",
            user_id: 4,
          },
          {
            nickname: "Bruce",
            species: "Snake Plant",
            days_between_watering: 3,
            img_url:
              "https://unsplash.com/photos/iIuyXTcEBTI",
            user_id: 4,
          },
        ]);
      });
  };