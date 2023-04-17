const Schema = require("mongoose").Schema;

const WorkspaceSchema = new Schema(
  {
    code: String,
    domain: Object,
    name: String,
    accountId: String,
    verification_config: [],
    authorization_config: [],
  },
  { collection: "workspace", versionKey: false }
);

module.exports = WorkspaceSchema;
