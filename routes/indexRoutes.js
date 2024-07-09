const express = require("express");
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const likeRoutes = require("./likeRoutes");
const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/blog", blogRoutes);
routes.use("/like", likeRoutes);

module.exports = routes;
