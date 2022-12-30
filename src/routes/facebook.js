"use strict";

const express = require("express");
const axios = require("axios");
const router = new express.Router();
var queryString = require("querystring");

console.log("facebook clientID: ", process.env.FACEBOOK_CLIEND_ID);
console.log("facebook secret: ", process.env.FACEBOOK_CLIENT_SECRET);
const clientId = process.env.FACEBOOK_CLIEND_ID;
const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
//const redirectUri = "https://sdk-iframe.herokuapp.com";

/**
 *  https://medium.com/@jackrobertscott/facebook-auth-with-node-js-c4bb90d03fc0
 *
 */
router.get("/requestURL", async (request, response) => {
  try {
    //console.log("Get auth code discord ", request.query);
    if (!(request.query && request.query.redirectUrl)) {
      throw "You should supply redirectUrl!";
    }

    const stringifiedParams = queryString.stringify({
      client_id: clientId,
      redirect_uri: request.query.redirectUrl,
      scope: ["email", "user_friends"].join(","), // comma seperated string
      response_type: "code",
      auth_type: "rerequest",
      display: "popup",
    });

    const authUrl = `https://www.facebook.com/v7.0/dialog/oauth?${stringifiedParams}`;

    response.json({ redirectURL: authUrl });
  } catch (ex) {
    console.error("/facebook/requestURL/", ex);
    response.status(500).json({ error: ex });
  }
});

// https://discord.com/developers/docs/topics/oauth2
// console.log("decoded uri ", decodeURIComponent(code));
router.post("/authcode", async (request, response) => {
  try {
    console.log("Get facebook code ", request.body.code);
    console.log("Get facebook redirect ", request.body.redirectUrl);

    if (!(request.body && request.body.code)) {
      throw "You should supply code!";
    }
    if (!(request.body && request.body.redirectUrl)) {
      throw "You should supply redirectUrl!";
    }

    const { data } = await axios({
      url: "https://graph.facebook.com/v7.0/oauth/access_token",
      method: "get",
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: request.body.redirectUrl,
        code: request.body.code,
      },
    });
    console.log("facebook oauth tokens : ", data); // { access_token, token_type, expires_in }

    let tokenInfo = data;
    // let access_token =
    //   "EAAJ4tPvkDgoBACQqpZAb7xD3ZAsZCWLZAd8MZCSFN352SNMXt8BY6H6TnxoWQIOOoYXnw5oFjZC6NnpX7fmpFE6k4a8LOqb1ZCmrc5iY8HfZCOfw2ZCluuoGMVLZBouqAJBo7Vq5WUOUX1lDZCVH6EvYvQMvECxq5kZAhly39o5bGF1cup09SR3o3dphZAUqfP5bfJJjMhNSZBJOVWo64mC2MIoOa9Rq1DBSTK6PXb0a3MvAoTWnTI7aT2ZApqqy8xqFOiGa392UJkTNHIRhwZDZD";

    let params = {
      fields: ["id", "email", "first_name", "last_name"].join(","),
      access_token: tokenInfo.access_token,
    };

    const userData = await axios.get("https://graph.facebook.com/v15.0/me", {
      params,
    });

    console.log("User info ", userData.data);

    response.json({ userInfo: userData.data, tokenInfo: tokenInfo });
  } catch (ex) {
    console.error("/login/reddit ", ex);
    response.status(500).json({ error: ex });
  }
});

router.post("/footprint", async (request, response) => {
  try {
    console.log("Get social info from facebook ", request.body.tokens);
    if (!(request.body && request.body.tokens)) {
      throw "You should supply tokens!";
    }

    response.json({
      friends: [],
      posts: [],
    });
  } catch (ex) {
    console.error("/footprint/facebook ", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
