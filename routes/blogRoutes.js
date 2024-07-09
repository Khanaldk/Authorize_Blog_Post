const express = require("express");
const BlogController = require("../controllers/blogController");
const authenticateUser = require("../middleware/authenticateUser");

const authorizeUserOrAdmin = require("../middleware/authorizeUser");

const blogRoutes = express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      BlogDetails:
 *        type: object
 *        required:
 *          - title
 *          - content
 *        properties:
 *          title:
 *           type: string
 *           description: User's title
 *          content:
 *           type: string
 *           description: User's content
 *
 *
 */

/**
 * @swagger
 * tags:
 *     name: Blog
 *     description: The Blog managing API endpoint
 */

/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create new blog
 *     security:
 *       - jwt: []
 *     tags: [Blog]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogDetails'
 *     responses:
 *       200:
 *         description: Created blog successfully
 *       500:
 *         description: Some Server Error
 */

blogRoutes.post(
  "/create",
  authenticateUser.tokenVerification,
  BlogController.createBlog
);

/**
 * @swagger
 * /blog/retrieveAll:
 *   get:
 *     summary: List of all blog
 *     security:
 *       - jwt: []
 *     tags: [Blog]
 *     responses:
 *      200:
 *          description: Blog List retrieved successfully
 *      500:
 *          description: Some Server Error
 */

blogRoutes.get(
  "/retrieveAll",
  authenticateUser.tokenVerification,
  BlogController.getAllBlog
);

/**
 * @swagger
 * /blog/retrieve/{blogId}:
 *   get:
 *     summary: Retrieve blog
 *     security:
 *       - jwt: []
 *     tags: [Blog]
 *     parameters:
 *      - in: path
 *        name: blogId
 *        schema:
 *          type: integer
 *          required: true
 *          description: Blog's id
 *     responses:
 *      200:
 *          description: Blog retrieved successfully
 *      500:
 *          description: Some Server Error
 */

blogRoutes.get(
  "/retrieve/:blogId",
  authenticateUser.tokenVerification,
  BlogController.getBlogById
);

/**
 * @swagger
 * /blog/update/{blogId}:
 *   patch:
 *     summary: Update blog
 *     security:
 *       - jwt: []
 *     tags: [Blog]
 *     parameters:
 *      - in: path
 *        name: blogId
 *        schema:
 *          type: integer
 *          required: true
 *          description: Blog's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogDetails'
 *     responses:
 *      200:
 *          description: Blog updated successfully
 *      500:
 *          description: Some Server Error
 */

blogRoutes.patch(
  "/update/:blogId",
  authenticateUser.tokenVerification,
  authorizeUserOrAdmin,
  BlogController.updateBlogById
);
/**
 * @swagger
 * /blog/delete/{blogId}:
 *   delete:
 *     summary: delete blog
 *     security:
 *       - jwt: []
 *     tags: [Blog]
 *     parameters:
 *      - in: path
 *        name: blogId
 *        schema:
 *          type: integer
 *          required: true
 *          description: blog's id
 *     responses:
 *      200:
 *          description: blog deleted successfully
 *      500:
 *          description: Some Server Error
 */

blogRoutes.delete(
  "/delete/:blogId",
  authenticateUser.tokenVerification,
  authorizeUserOrAdmin,
  BlogController.deleteBlogById
);

/**
 * @swagger
 * /blog/getAllLikes/{blogId}:
 *   get:
 *     summary: Retrieve blog's like
 *     security:
 *       - jwt: []
 *     tags: [Blog]
 *     parameters:
 *      - in: path
 *        name: blogId
 *        schema:
 *          type: integer
 *          required: true
 *          description: Blog's id
 *     responses:
 *      200:
 *          description: Blog's like retrieved successfully
 *      500:
 *          description: Some Server Error
 */

blogRoutes.get("/getAllLikes/:blogId", BlogController.getBlogAllLikesById);

module.exports = blogRoutes;
