"use strict";

const express = require("express");
const axios = require("axios");
const validator = require("$core-services/parameterValidator");
const router = new express.Router();

const CREATE_PARAMTERS = ["name", "domain", "accountId"];

const {
  createWorkspace,
  updateWorkspace,
  getWorkspace,
  deleteWorkspace,
} = require("../services/workspace");

router.post("/create", async (request, response) => {
  try {
    const { body } = validator(request.body, CREATE_PARAMTERS);

    let data = await createWorkspace(request.body);

    response.json({ data });
  } catch (ex) {
    console.error("/reddit/requestURL/", ex);
    response.status(500).json({ error: ex });
  }
});

router.get("/all", async (request, response) => {
  try {
    //console.log("Get auth code discord ", request.query);
    if (!(request.body && request.body.clientId)) {
      throw "You should supply redirectUrl!";
    }
    if (!(request.body && request.body.clientSecret)) {
      throw "You should supply redirectUrl!";
    }

    // request token

    response.json({ codeVerifier, redirectURL: url, state });
  } catch (ex) {
    console.error("/reddit/requestURL/", ex);
    response.status(500).json({ error: ex });
  }
});

router.get("/id/:{id}", async (request, response) => {
  try {
    //console.log("Get auth code discord ", request.query);
    if (!(request.body && request.body.clientId)) {
      throw "You should supply redirectUrl!";
    }
    if (!(request.body && request.body.clientSecret)) {
      throw "You should supply redirectUrl!";
    }

    // request token

    response.json({ codeVerifier, redirectURL: url, state });
  } catch (ex) {
    console.error("/reddit/requestURL/", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
