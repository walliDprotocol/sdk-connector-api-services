const Schema = require("mongoose").Schema;

const PermissionSchema = new Schema(
  {
    name: String,
  },
  { collection: "permission", versionKey: false }
);

module.exports = PermissionSchema;
