const Data = require("$database");

const logError = require("$core-services/logFunctionFactory").getErrorLogger();
const logWarn = require("$core-services/logFunctionFactory").getWarnLogger();
const logDebug = require("$core-services/logFunctionFactory").getDebugLogger();

let createWorkspace = async function (data) {
  try {
    let query = await Data.createWorkSpace(data);
    return query;
  } catch (ex) {
    console.log("Error create workspace ", ex);
    throw ex;
  }
};

let updateWorkspace = async function (id, updateBody) {
  try {
    let updated = await Data.storeTodo(updateBody);
    return updated;
  } catch (ex) {
    console.log("update workspace error ", ex);
    throw ex;
  }
};

let getWorkspace = async function (id) {
  try {
    let updated = await Data.findTodoAndUpdate({ _id: id }, updateBody, {
      returnOriginal: false,
      upsert: true,
    });
    return updated;
  } catch (ex) {
    console.log("get all info for workspace ", ex);
    throw ex;
  }
};

let deleteWorkspace = async function (id) {
  try {
    let updated = await Data.deleteOne({ _id: id });
    return updated;
  } catch (ex) {
    console.log("delete workspace error ", ex);
    throw ex;
  }
};

module.exports = {
  createWorkspace,
  updateWorkspace,
  getWorkspace,
  deleteWorkspace,
};
