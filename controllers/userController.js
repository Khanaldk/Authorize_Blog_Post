const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserController = {};

UserController.signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hashSync(password, salt);
  const userData = {
    userName: req.body.userName,
    email: req.body.email,
    password: hashpassword,
    role: "user",
  };
  const newUser = await models.User.create(userData);
  if (newUser) {
    return res.status(200).json({
      message: "User created successfully!",
      User: userData,
    });
  }
  return res.status(500).json({
    message: "Something went wrong!",
  });
};

UserController.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(204).json({
      message: "Please enter email or password first!",
    });
  }
  const user = await models.User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(404).json({
      message: "You are the registered user!",
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (checkPassword) {
    const token = await jwt.sign(
      { userId: user.id, userName: user.userName, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      message: "Login successfully!",
      token: token,
    });
  }
  return res.status(404).json({
    message: "Invalid credentials!",
  });
};

module.exports = UserController;
