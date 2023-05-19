# Verification-connector


## Event Interaction Between Iframe and Host

[[https://github.com/walliDprotocol/verification-sdk-connector-api/blob/main/uploads/schema_iframe_host.png|ALT TEXT]]

The host website should listen to the channel "request_seed" as demonstrated in the examples.

```

    pubnub.subscribe({ channels: ["request_seed"] }) ;
 
```

In this example, the host website should listen for the event where the request for a seed is published. After receiving this request, it should make a request to the backend with the account ID received in the message and publish it on the channel "publish_channel_"+account_id.

```

    pubnub.addListener({
      message: (receivedMessage) => {

        if(receivedMessage.channel == REQUEST_SEED_CHANNEL)
        {
          let payload = JSON.parse(receivedMessage.message)
          let accountId = payload.accountId;
          //request backend using the account id in order to grab the seed associated with account id
          let seedFromBackend = "seed returned by backend"
          pubnub.publish({
            message: seedFromBackend ,
            channel: PUBLISH_SEED_CHANNEL + payload.account_id,
          }, (status, response) => {
            // handle status, response
          });
        }
      }
  
```


## Routes

### POST /api/v1/social-profile/twitter

This route is designed to retrieve information about the most recent post on Twitter for a specific user. To utilize this route, you need to provide a valid username corresponding to an existing Twitter account. Additionally, by using this route, you can obtain more comprehensive details about the user on Twitter, including their Twitter ID.

By accessing this route and supplying the relevant username, you can retrieve the latest post made by the specified user on Twitter. This feature can be useful for various purposes, such as tracking the recent activity of a particular user or monitoring updates from accounts of interest.


**Request Body**

```json
{
    "username": "<twitter_username>"
```

**Response Example**

```json
{
    "message": "",
    "data": {
        "error": false,
        "data": {
         "id": "id of the post",
         "text": "post text",
         "created_at" : "date of post",
          "user": {
                "id": "twitter_id",
                "id_str": "twitter id",
                "name": "Name",
                "screen_name": "username"
            },
            
           
            
        }
}
```

### GET /getNftInfo

After an NFT is created, it contains information regarding the holder of the NFT, the percentage of ownership, and details about the NEAR account associated with it.


**Request Body**

```json
{
    "nft_id": "nft id",
    "twitter_account_id": "twitter id after user authenticates on twitter"
```

**Response Example**

```json
{
    "nft_id": "0x10",
    "createdDate": "01-01-2023",
    "createdBy": "0x13123142",
    "walliDConfig": "6442a455cbffdd273b266f06",
    "owners": [
      {
        "social_handler": {
          "type": "twitter",
          "username": "masterviana",
          "HoldingPosition": 80
        },
        "implicitAccountAddress": "0x131312412412412",
        "accountId" : "id of the account",
        "seedPhrase" : "?????"    
    }
   ]
}
```


## environment variables

For using on a develeopment environment it using `dotenv` module so you could use a .env file to add the following env vars

## build commands

install depencies

```
npm install
```

running backend

```
npm start
```

running backend on development mode

```
npm run develop
```

# Twitter

Should grab this vars from twitter development account at: https://developer.twitter.com/en/portal/dashboard

```
TWITTER_CONSUMER_KEY=<consumer key>
TWITTER_CONSUMER_SECRET=<consumer secret>
TWITTER_CALLBACK=<twitter callback>
TWITTER_CLIENT_ID=<client id>
TWITTER_CLIENT_SECRET=<client secret>
TWITTER_ACCOUNT_TO_FOLLOW=<id account to follow>
TWITTER_POST_TO_RETWEET=<post id retweeted>
```

# Discord

Should grab this vars from discord development account at: https://discord.com/developers/applications
Go to your application and get these vars

```
DISCORD_CLIENT_ID=<client_id>
DISCORD_SECRET=<client_secret>
DISCORD_REDIRECT=<redirect_url>
```

# Database

```
MONGO_URI=<mongo_uri>
```
