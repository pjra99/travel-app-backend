var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: [true, "A user must have a unique email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
