const Schema = require("mongoose").Schema;
const Providers = require("../../../../configs/providers.json");

const ProviderSchema = new Schema(
  {
    name: {
      type: String,
      enum: Providers,
    },
    type: {
      type: String,
      enum: ["OAUTH", "WEB3"],
    },
    clientId: String,
    clientSecret: String,
    redirectUrl: String,

    workspaceId: String,
    status: String,
  },
  { collection: "provider", versionKey: false }
);

module.exports = ProviderSchema;
