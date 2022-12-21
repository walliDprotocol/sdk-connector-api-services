const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

oauth
  .tokenRequest({
    clientId: "",
    clientSecret: "",

    code: "query code",
    scope: "identify guilds",
    grantType: "authorization_code",

    redirectUri: "http://localhost:9000/callback",
  })
  .then(console.log);
