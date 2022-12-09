# whitelist-dapp-backend

Backend REST api for supporting operations for whitelist NFT operation. Supports oAuth routes for twitter and discord, logic for search twitter features retweets, follows etc.

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
