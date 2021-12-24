# Discord.bots.gg AutoPoster
Easy AutoPosting via the unofficial [discord.bots.gg SDK](https://github.com/beatX-bot/discordbots-node-sdk)

### Disclaimer

This module is based on the code of the Top.gg autoposter available [here](https://github.com/jpbberry/topgg-autoposter)
However, the codebase has been modified to work with the unofficial discord.bots.gg SDK

# Example Usage
```js
const { AutoPoster } = require('@beatx/dbots-autoposter')

const poster = AutoPoster('dbotstoken', client) // your discord.js or eris client

// optional
poster.on('posted', (stats) => { // ran when succesfully posted
  console.log(`Posted stats to Discord.bots.gg | ${stats.serverCount} servers`)
})
```
*You can also do poster.on('error', (err) => { ... }) and this will stop errors from being logged and left for you to handle*

And that's it!

It will begin to post your server count, and shard count every 30 minutes.

This even work on individual Discord.JS shards that are process separated.

If you would like to do specific clients, `DJSPoster` & `ErisPoster` & `DJSSharderPoster` & `RosePoster` are all exported classes!

## Traditional Discord.JS Sharding:

If you use Discord.JS' traditional `ShardingManager` sharder, you can also append the AutoPoster to the sharding manager like so:

```js
const sharder = new Discord.ShardingManager(...)

const poster = AutoPoster('dbotstoken', sharder)

sharder.spawn() // rest of your stuff!
```
This will run broadcastEval's and automatically fetch your statistics!

## [Discord-Rose](https://npmjs.com/discord-rose) posting

```js
const master = new Master(...)

const poster = AutoPoster('dbotstoken', master)
```
And it will run everything through comms.getStats() function
