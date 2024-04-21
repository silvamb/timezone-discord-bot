# Discord Time Bot
Discord bot that uses the time from a specific timezone as nickname.

## Installation

First, you'll need to [create an app](https://discord.com/developers/applications?new_application=true) in the developer portal if you don't have one already.

On the left hand sidebar click **Bot**. On this page, you can configure settings like its privileged intents or whether it can be installed by other users.

But first copy the token and set in the file `template.env`.

Click on OAuth2 in the left sidebar, then select URL generator.

Just add the bot scope, which adds your bot user.

After you select **bot**, select the following scopes:

* Change Nickname
* Send Messages
* Send Messages in Threads
* Embed Links
* Read Message History

Once you add scopes, you should see a URL that you can copy to install your app.

Copy the URL and paste it into your browser. You'll be guided through the installation flow, where you should make sure you're installing your app on a server where you can develop and test it.

## Build and Run

You need [Node.js](https://nodejs.org/en) to build and run this project.

Clone this repository from GitHub. Alternatively, download the code.

Build the code using `npm`.
```shell
npm install
```

Access [Discord Developer Portal](https://discord.com/developers/applications) and select your bot to copy the credentials your bot need to access Discord API.

Copy the application ID and public key and set in the file `template.env`.

On the left hand sidebar click **Bot**. Copy the token from the "Token" section and set in the file `template.env`.

Finally, rename the `template.env` file to `.env`. The bot will load the properties in this file to authenticate to the Discord Server.

You need now to register the commands. This step should be **run only once**.
```shell
npm run register
```

Run the bot.
```shell
npm run start
```

## Usage

Your bot nickname will be set to `Not Configured` once the server starts. Set the timezone for it using the `/time` command in Discord.

```shell
/time timezone:utc
```