const Data = require("$database");
const ProvidersTemplate = require("../../configs/provider_config.json");
const logError = require("$core-services/logFunctionFactory").getErrorLogger();
const logWarn = require("$core-services/logFunctionFactory").getWarnLogger();
const logDebug = require("$core-services/logFunctionFactory").getDebugLogger();

let createConfig = async function (data) {
  try {
    let updateOptions = {};

    for (let i in data.providers) {
      let updateOptions = await createProvidersSchema(data.providers[i]);
      data.providers[i].options = updateOptions;
    }

    console.log("new edit provider ist ", data);

    let queryData = await Data.createConfig(data);

    return queryData;
  } catch (ex) {
    console.log("Error creating config for workspace!", ex);
    throw ex;
  }
};

let createProvidersSchema = async function (inputProvider) {
  try {
    console.log("input provider ", inputProvider);
    let providerTemplate = ProvidersTemplate[inputProvider.IdName];

    if (!providerTemplate) {
      throw "Its not a allowed code " + inputProvider.IdName;
    }

    let providerHardCopy = JSON.parse(JSON.stringify(providerTemplate));

    for (let i in providerHardCopy.options) {
      let element = providerHardCopy.options[i];
      let userSelectionData = inputProvider.options.find(
        (item) => item.code == element.code
      );
      element.state = userSelectionData.state;
    }

    return providerHardCopy.options;
  } catch (ex) {
    console.log("Error when filled provider with provider template ");
    throw ex;
  }
};

let updateConfig = async function (id, updateBody) {
  try {
    let updated = await Data.findConfig({ _id: id }, updateBody, {
      returnOriginal: false,
      upsert: true,
    });
    return updated;
  } catch (ex) {
    console.log("update workspace error ", ex);
    throw ex;
  }
};

let listConfig = async function (criteria) {
  try {
    let queryData = await Data.findConfig(
      criteria,
      { "providers.clientSecret": 0, "providers.clientId": 0 },
      null
    );
    return queryData;
  } catch (ex) {
    console.log("List configuration ", ex);
    throw ex;
  }
};

let getConfig = async function (criteria) {
  try {
    let queryData = await Data.findConfig(criteria, null, null);
    return queryData;
  } catch (ex) {
    console.log("Get configuration ", ex);
    throw ex;
  }
};

module.exports = {
  createConfig,
  updateConfig,
  listConfig,
};
