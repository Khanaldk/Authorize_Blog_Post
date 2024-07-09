const express = require("express");
const LikeController = require("../controllers/likeController");
const authenticateUser = require("../middleware/authenticateUser");
const likeRoutes = express.Router();

/**
 * @swagger
 * tags:
 *     name: Like
 *     description: The Like managing API endpoint
 */

/**
 * @swagger
 * /like/{blogId}:
 *   post:
 *     summary: like new blog
 *     security:
 *       - jwt: []
 *     tags: [Like]
 *     parameters:
 *      - in: path
 *        name: blogId
 *        schema:
 *          type: integer
 *          required: true
 *          description: Blog's id
 *     responses:
 *       200:
 *         description: like Blog successfully
 *       500:
 *         description: Some Server Error
 */

likeRoutes.post(
  "/:blogId",
  authenticateUser.tokenVerification,
  LikeController.likeBlog
);

module.exports = likeRoutes;
