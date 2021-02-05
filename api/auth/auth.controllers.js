const UsersModel = require("../users/users.model");
const generateAvatar = require("../helpers/generateAvatar");
const sendEmailVerification = require("../helpers/email.vetification.send");
const { v4: uuidv4 } = require("uuid");

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
  const user = await UsersModel.create({
    email: req.body.email,
    password: passwordHashed,
    avatarUrl,
  });
  const verificationToken = uuidv4();
  await user.createVerificationToken(verificationToken);
  await sendEmailVerification(req.body.email, verificationToken);
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

module.exports.verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const verifiedUser = await UsersModel.findByVerificationToken(
    verificationToken
  );
  if (!verifiedUser) {
    return res.send(404).send("User not found!");
  }
  await verifiedUser.removeVerificationToken();
  return res.status(200).send("Verified");
};
