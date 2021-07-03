const { decodeToken } = require("../services/jwtService");
exports.authenticateUser = (req, res, next) => {
  // check if theres anuth token
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "authorization header required" });
  }
  next();
};
