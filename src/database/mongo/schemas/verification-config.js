const Schema = require("mongoose").Schema;

const VerificationConfig = new Schema(
  {
    workspaceID: String,
    name: String,
    providersID: [],
    status: String,
  },
  { collection: "VerificationConfig", versionKey: false }
);

VerificationConfig.set("timestamps", true);

module.exports = VerificationConfig;
