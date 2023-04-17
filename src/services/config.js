const Data = require("$database");

const logError = require("$core-services/logFunctionFactory").getErrorLogger();
const logWarn = require("$core-services/logFunctionFactory").getWarnLogger();
const logDebug = require("$core-services/logFunctionFactory").getDebugLogger();

let createConfig = async function (data) {
  try {
    let query = await Data.createConfig(data);

    return query;
  } catch (ex) {
    console.log("Error creating config for workspace!", ex);
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
    let queryData = await Data.findConfig(criteria, null, null);
    return queryData;
  } catch (ex) {
    console.log("List configuration ", ex);
    throw ex;
  }
};

module.exports = {
  createConfig,
  updateConfig,
  listConfig,
};
