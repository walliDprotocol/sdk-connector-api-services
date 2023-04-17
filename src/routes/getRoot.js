"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");

const router = new express.Router();

router.get("/getConfig", async (request, response) => {
  //const appInfo = await getAppInfo();

  response.status(200).json({
    nft_id: "87987999",
    workspaceId: "643963997c5c847a2c875841",
  });
});

router.get("/getNftInfo", async (request, response) => {
  //const appInfo = await getAppInfo();

  response.status(200).json({
    nft_id: "77778763111",
    workspaceId: "643963997c5c847a2c875841",
  });
});

module.exports = router;
