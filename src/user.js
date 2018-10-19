const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
