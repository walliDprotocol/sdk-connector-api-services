"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");

const router = new express.Router();
const axios = require("axios");
var querystring = require("querystring");

let callbackURL = "https://sdk-iframe.herokuapp.com";

console.log("discord clientID: ", process.env.DISCORD_CLIENT_ID);
console.log("discord secret: ", process.env.DISCORD_CLIENT_SECRET);
const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;

router.get("/requestURL", async (request, response) => {
  let authUrl =
    "https://discord.com/api/oauth2/authorize?client_id=947877511910527066&redirect_uri=$callback&response_type=code&scope=identify%20guilds";

  try {
    //console.log("Get auth code discord ", request.query);
    if (!(request.query && request.query.redirectUrl)) {
      throw "You should supply redirectUrl!";
    }

    authUrl = authUrl.replace("$callback", request.query.redirectUrl);
    console.log("Auth generate URL : ", authUrl);
    response.json({ redirectURL: authUrl });
  } catch (ex) {
    console.error("/authcode/discord", ex);
    response.status(500).json({ error: ex });
  }
});

// https://discord.com/developers/docs/topics/oauth2
// code: "query code",
// 	scope: "identify guilds",
// grantType: "authorization_code",
router.post("/authcode", async (request, response) => {
  try {
    console.log("Get auth code discord ", request.body.code);
    if (!(request.body && request.body.code)) {
      throw "You should supply code!";
    }

    const oauthDiscord = "https://discord.com/api/oauth2/token";

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    let data = await axios.post(
      oauthDiscord,
      querystring.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: request.body.code,
        redirect_uri: DISCORD_REDIRECT,
      }),
      {
        headers: headers,
      }
    );

    console.log("Data from discord auth : ", data.data);
    response.json(data.data);
  } catch (ex) {
    console.error("/login/discord ", ex);
    response.status(500).json({ error: ex });
  }
});

router.post("/footprint", async (request, response) => {
  try {
    console.log("Get social info from discord ", request.body.tokens);
    if (!(request.body && request.body.tokens)) {
      throw "You should supply tokens!";
    }

    response.json({
      friends: [],
      posts: [],
    });
  } catch (ex) {
    console.error("/login/discord ", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
