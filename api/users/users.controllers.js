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

module.exports.updateAvatar = async (req, res) => {
  req.user.avatarUrl = `http://localhost:${process.env.PORT}/images/${req.file.filename}`;
  await req.user.save();
  res.status(200).json({ message: "avatar modified" });
};
