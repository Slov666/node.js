require("dotenv").config();
// const UsersModel = require("./users.model");

module.exports.getUser = async (req, res) => {
  res.status(200).json({
    user: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
};
module.exports.updateUser = async (req, res) => {
  req.user.subscription = req.body.subscription;
  await req.user.save();
  res
    .status(200)
    .json({ message: "user modified", subscription: req.user.subscription });
};
