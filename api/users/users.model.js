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
  avatarUrl: { type: String },
  verificationToken: { type: String },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: String, default: "" },
});

usersSchema.methods.compare = compare;
usersSchema.statics.hashedPassword = hashedPassword;
usersSchema.methods.sign = sign;
usersSchema.statics.verifyToken = verifyToken;
usersSchema.methods.createVerificationToken = createVerificationToken;
usersSchema.statics.findByVerificationToken = findByVerificationToken;
usersSchema.methods.removeVerificationToken = removeVerificationToken;

async function hashedPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}
async function compare(reqPassword) {
  const bcryptCompare = await bcrypt.compare(reqPassword, this.password);
  return bcryptCompare;
}

async function sign() {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET
  );
  this.token = token;
  this.save();
  return token;
}
async function verifyToken(token) {
  const userToCheck = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decode) => {
      if (err) return { err: err };
      return decode;
    }
  );
  return userToCheck;
}
async function createVerificationToken(verificationToken) {
  this.verificationToken = verificationToken;
  this.save();
}
async function findByVerificationToken(verificationToken) {
  return this.findOne({ verificationToken });
}
async function removeVerificationToken() {
  return UsersModel.findByIdAndUpdate(this._id, {
    verificationToken: null,
  });
}

const UsersModel = mongoose.model("User", usersSchema);
module.exports = UsersModel;
