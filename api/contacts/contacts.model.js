const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  password: {
    type: String,
    required: true,
  },
});
contactsSchema.plugin(mongoosePaginate);
module.exports = Contacts = mongoose.model("contacts", contactsSchema);
