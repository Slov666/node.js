const UsersModel = require("../users/users.model");
const generateAvatar = require("../helpers/generateAvatar");
require("dotenv").config();

module.exports.registration = async (req, res) => {
  const userToCheck = await UsersModel.findOne({ email: req.body.email });
  if (userToCheck) {
    return res
      .status(409)
      .json({ message: "a user with this email is already exists" });
  }
  const passwordHashed = await UsersModel.hashedPassword(req.body.password);
  const avatar = await generateAvatar(req.body.email);
  const avatarUrl = `http://localhost:${process.env.PORT}/images/${avatar}`;
  await UsersModel.create({
    email: req.body.email,
    password: passwordHashed,
    avatarUrl,
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
  if (!userToCheck.compare(req.body.password)) {
    return res.status(401).json({ message: `Incorrect passwod` });
  }

  const token = await userToCheck.sign();
  // const token = await userToCheck.sign(userToCheck.email, userToCheck._id);

  res.status(200).json({
    token: token,
    user: {
      email: userToCheck.email,
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
