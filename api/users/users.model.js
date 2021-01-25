const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: String, default: "" },
});

const UsersModel = mongoose.model("users", usersSchema);

UsersModel.hashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

UsersModel.compare = async (reqPassword, hashedPassword) => {
  const compare = await bcrypt.compare(reqPassword, hashedPassword);
  return compare;
};
UsersModel.sign = async (id, email) => {
  const token = jwt.sign(
    {
      _id: id,
      email: email,
    },
    process.env.JWT_SECRET
  );
  return token;
};
UsersModel.verify = async (token) => {
  const userToCheck = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decode) => {
      if (err) return { err: err };
      return decode;
    }
  );
  return userToCheck;
};

module.exports = UsersModel;
