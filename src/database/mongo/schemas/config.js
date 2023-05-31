const Schema = require("mongoose").Schema;
const Providers = require("../../../../configs/providers.json");

const ConfigSchema = new Schema(
  {
    workspaceId: String,
    type: {
      type: String,
      enum: ["VERIFICATION", "AUTHORIZATION"],
    },
    name: {
      type: String,
    },
    displayName: String,
    chainId: String,
    rpc: String,
    providers: [
      {
        IdNameDesc: {
          type: String,
          required: false,
        },
        options: {
          type: {},
          required: true,
        },
        IdName: {
          type: String,

          required: true,
        },
        type: {
          type: String,
          enum: ["OAUTH", "WEB3"],
          required: true,
        },
        clientId: {
          type: String,
          required: true,
        },
        clientSecret: {
          type: String,
          required: true,
        },
        contractAddress: String,
        contractType: String,
        redirectUrl: String,
      },
    ],
    status: String,
  },
  { collection: "workspace_config", versionKey: false }
);

ConfigSchema.set("timestamps", true);

module.exports = ConfigSchema;
