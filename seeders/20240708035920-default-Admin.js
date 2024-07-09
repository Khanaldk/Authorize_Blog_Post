"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = process.env.SEED_ADMINUSER_PASSWORD || "admin123";
    return queryInterface.bulkInsert("users", [
      {
        userName: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync(password, 10),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", { email: "admin@gmail.com" }, {});
  },
};
