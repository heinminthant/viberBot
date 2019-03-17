'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const bot = new ViberBot({
	authToken: "authToken",
	name: "EchoBot",
	avatar : "https://cdn3.iconfinder.com/data/icons/customer-support-7/32/40_robot_bot_customer_help_support_automatic_reply-512.png"
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	response.send(message);
});

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const https = require('https');
const port = process.env.PORT || 8080;

// Viber will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = "https://lit-atoll-17195.herokuapp.com/viber";

https.createServer(bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));
