const jwt = require("jsonwebtoken");
const UsersModel = require("../users/users.model");
require("dotenv").config();

module.exports.registration = async (req, res) => {
  const userToCheck = await UsersModel.findOne({ email: req.body.email });
  if (userToCheck) {
    return res
      .status(409)
      .json({ message: "a user with this email is already exists" });
  }

  const passwordHashed = await UsersModel.hashedPassword(req.body.password);

  await UsersModel.create({
    email: req.body.email,
    password: passwordHashed,
  });
  res
    .status(201)
    .json({ user: { email: req.body.email, subscription: "free" } });
};

module.exports.login = async (req, res) => {
  const userToCheck = await UsersModel.findOne({ email: req.body.email });
  if (!userToCheck) {
    return res
      .status(401)
      .json({ message: `No user with email ${req.body.email} found` });
  }
  if (!UsersModel.compare(req.body.password, userToCheck.password)) {
    return res.status(401).json({ message: `Incorrect passwod` });
  }

  const token = await UsersModel.sign(userToCheck._id, userToCheck.email);

  res.status(200).json({
    token: token,
    user: {
      email: req.body.email,
      subscription: "free",
    },
  });
};

module.exports.logout = async (req, res) => {
  const user = await UsersModel.findById(req.user._id);
  if (!user) return res.status(401).json({ message: "Not authorized" });
  user.token = null;
  res.status(204).send();
};
