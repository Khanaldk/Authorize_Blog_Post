const jwt = require("jsonwebtoken");

const authenticateUser = {};

authenticateUser.tokenVerification = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(404).json({
      message: "Token not found!",
    });
  }
  const decodedToken = token.split(" ")[1];
  const accesstoken = await jwt.verify(decodedToken, process.env.SECRET_KEY);
  if (!accesstoken) {
    return res.status(401).json({
      message: "Failed to authenticate token!",
    });
  }
  req.user = accesstoken;
  next();
};

module.exports = authenticateUser;
