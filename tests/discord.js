const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

// oauth
//   .tokenRequest({
//     clientId: "",
//     clientSecret: "",

//     code: "query code",
//     scope: "identify guilds",
//     grantType: "authorization_code",

//     redirectUri: "http://localhost:9000/callback",
//   })
//   .then(console.log);

let code =
  "https://discord.com/api/oauth2/authorize?client_id=947877511910527066&redirect_uri=https://sdk-iframe.herokuapp.com/&response_type=code&scope=identify%20guilds";

console.log("code : ", encodeURIComponent(code));
