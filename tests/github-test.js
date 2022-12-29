const clientId = "";
const clientSecret = "";
//const redirectUri = "https://sdk-iframe.herokuapp.com";
const redirectUri = "http://localhost:8080/";
const axios = require("axios");
var queryString = require("querystring");

let getAuthUrl = function () {
  const authUrl =
    "https://github.com/login/oauth/authorize" +
    "?client_id=" +
    clientId +
    "&redirect_uri=" +
    redirectUri +
    "&scope=user";

  console.log("auth url ", authUrl);
};

let getUserTokensAndData = async function (code) {
  console.log("Code : ", code);
  let user = {};

  try {
    // Use the authorization code to request an access token
    let tokenData = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    var queryData = queryString.parse(tokenData.data);
    console.log("token data :", queryData.access_token);

    //Use the access token to authenticate requests to the GitHub API
    user = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: "token " + queryData.access_token,
        "User-Agent": "WalliD SDK Request",
      },
    });

    //console.log("github user :", user.data);
  } catch (ex) {
    throw ex;
  }

  return user.data;
};

// const authUrl =
//   "https://github.com/login/oauth/authorize" +
//   "?client_id=" +
//   clientId +
//   "&redirect_uri=" +
//   redirectUri +
//   "&scope=user";

// // When the user is redirected back to the redirect URI, the authorization code will be available in the query string
// const code = req.query.code;

// // Use the authorization code to request an access token
// request.post(
//   {
//     url: "https://github.com/login/oauth/access_token",
//     form: {
//       client_id: clientId,
//       client_secret: clientSecret,
//       code: code,
//     },
//     headers: {
//       Accept: "application/json",
//     },
//   },
//   (err, res, body) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     // The body will contain the access token in the form of a JSON object
//     const accessToken = JSON.parse(body).access_token;

//     // Use the access token to authenticate requests to the GitHub API
//     request.get(
//       {
//         url: "https://api.github.com/user",
//         headers: {
//           Authorization: "token " + accessToken,
//           "User-Agent": "MyApp",
//         },
//       },
//       (err, res, body) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         // The body will contain the authenticated user's profile information
//         const user = JSON.parse(body);
//         console.log(user);
//       }
//     );
//   }
// );

//getAuthUrl();

let code = "809ba1d9a78a7c50b411";
async function run() {
  console.log("gihub user ; ", await getUserTokensAndData(code));
}

run();
