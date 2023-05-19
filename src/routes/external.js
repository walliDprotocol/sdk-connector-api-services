"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");

const router = new express.Router();

router.get("/getConfig", async (request, response) => {
  //const appInfo = await getAppInfo();

  response.status(200).json({
    nft_id: "87987999",
    configId: "6442a455cbffdd273b266f06",
  });
});

router.get("/getNftInfo", async (request, response) => {
  if (!(request.query && request.query.nft_id)) {
    throw "You should supply nft_id!";
  }

  response.status(200).json({
    nft_id: request.query.nft_id,
    createdDate: "01-01-2023",
    createdBy: "0x13123142",
    walliDConfig: "6442a455cbffdd273b266f06",
    owners: [
      {
        social_handler: {
          type: "twitter",
          username: "masterviana",
          HoldingPosition: 80,
        },
        implicitAccount: "0x131312412412412",
      },
      {
        social_handler: {
          type: "twitter",
          username: "_o_ruivo_",
          HoldingPosition: 80,
        },
        implicitAccount: "0x131312412412412",
      },
      {
        social_handler: {
          type: "twitter",
          username: "CryptoVeiga",
          HoldingPosition: 10,
        },
        implicitAccount: "0x131312412412413",
      },
      {
        social_handler: {
          type: "twitter",
          username: "microchipgnu",
          HoldingPosition: 5,
        },
        implicitAccount: "0x131312412412413",
      },
      {
        social_handler: {
          type: "twitter",
          username: "Beatriz26818816",
          HoldingPosition: 5,
        },
        implicitAccount: "0x131312412412414",
      },
    ],
  });
});

router.get("/getSeed", async (request, response) => {
  response.status(200).json({
    seed: "seed phrase words are in here",
  });
});

module.exports = router;
