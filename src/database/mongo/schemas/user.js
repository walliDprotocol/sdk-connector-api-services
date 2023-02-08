const Schema = require("mongoose").Schema;

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    isVerified: Boolean,
  },
  { collection: "user", versionKey: false }
);

module.exports = UserSchema;
