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

usersSchema.statics.hashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
usersSchema.methods.compare = async (reqPassword) => {
  const bcryptCompare = await bcrypt.compare(reqPassword, this.password);
  return bcryptCompare;
};

usersSchema.methods.sign = async () => {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET
  );
  return token;
};
usersSchema.statics.verifyToken = async (token) => {
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

const UsersModel = mongoose.model("User", usersSchema);
module.exports = UsersModel;
