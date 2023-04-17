const Schema = require("mongoose").Schema;

const MemberSchema = new Schema(
  {
    user_id: String,
    workspace_id: String,
  },
  { collection: "workspace_member", versionKey: false }
);

module.exports = MemberSchema;
