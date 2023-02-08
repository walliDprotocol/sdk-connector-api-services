const Schema = require("mongoose").Schema;

const AuthorizeConfig = new Schema(
  {
    workspaceID: String,
    name: String,
    providersID: [],
  },
  { collection: "AuthorizeConfig", versionKey: false }
);

AuthorizeConfig.set("timestamps", true);

module.exports = AuthorizeConfig;
