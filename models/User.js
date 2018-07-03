let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const UserSchema = new Schema({
  account: {
    username: { type: String, index: { unique: true } },
    biography: String
  },
  email: { type: String, index: { unique: true } },
  token: String,
  hash: String, // hashed password
  salt: String
});

module.exports = mongoose.model("User", UserSchema);
