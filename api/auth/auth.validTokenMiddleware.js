const jwt = require("jsonwebtoken");
const UsersModel = require("../users/users.model.js");

module.exports = async (req, res, next) => {
  const header = req.get("authorization");
  if (!header) {
    return res
      .status(401)
      .json({ message: "can not find a header authorization" });
  }
  const [type, token] = header.split(" ");

  if (!token) {
    return res.status(401).json({ message: "can not find a token in header" });
  }

  const userToCheck = await UsersModel.verify(token);
  if (userToCheck.err) {
    return res.status(400).json({ message: "invalid token" });
  }
  const user = await UsersModel.findById(userToCheck._id);
  if (!user) return res.status(401).json({ message: "Not authorized" });
  user.token = token;
  req.user = user;
  next();
};
