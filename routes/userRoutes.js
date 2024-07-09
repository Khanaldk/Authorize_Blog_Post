const express = require("express");
const UserController = require("../controllers/userController");
const userRoutes = express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      userDetail:
 *        type: object
 *        required:
 *          - userName
 *          - email
 *          - password
 *        properties:
 *          userName:
 *           type: string
 *           description: User's userName
 *          email:
 *           type: string
 *           description: User's Email
 *          password:
 *           type: string
 *           description: User's Password
 *
 */

/**
 * @swagger
 * tags:
 *     name: User
 *     description: The user managing API endpoint
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create new user
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userDetail'
 *     responses:
 *       200:
 *         description: Created User successfully
 *       500:
 *         description: Some Server Error
 */

userRoutes.post("/signup", UserController.signUp);

/**
 * @swagger
 *  components:
 *    schemas:
 *      loginDetails:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *           type: string
 *           description: User's Email
 *          password:
 *           type: string
 *           description: User's Password
 *
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login user
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginDetails'
 *     responses:
 *       200:
 *         description: login User successfully
 *       500:
 *         description: Some Server Error
 */

userRoutes.post("/login", UserController.login);

module.exports = userRoutes;
