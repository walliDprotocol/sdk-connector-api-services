const Schema = require("mongoose").Schema;

const AccountSchema = new Schema(
  {
    name: String,
    displayName: String,
    accountId: String,
    adminId: String,
    status: String,
  },
  { collection: "account", versionKey: false }
);

module.exports = AccountSchema;
