'use strict';

const
  express = require("express"),
  request = require('request'),
  bodyParser = require("body-parser"),
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
  app = express().use(bodyParser.json()) // Create express http

app.listen(process.env.PORT || 1337, () => console.log("Hello world"))

app.post("/webhook", (req, res) => {
  let body = req.body;
  console.log(body);
  if (body.object === 'page') {
    body.entry.forEach( function(entry) {
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);

        // Get sender
        let sender_psid = webhook_event.sender.id;
        console.log('Sender PSID: ' + sender_psid);

        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);
        } else if(webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
        }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.status(200).send("OK");
  }
});

app.get("/webhook", (req, res) => {
  let VERIFY_TOKEN = "toto";
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  console.log(req.query);
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else{
      res.status(200).send("OK");
    }
  } else {
    res.status(200).send(challenge).end();
  }
});

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  let lazada = "lazada";
  let shopee = "shopee";
  let website = "website";
  if (received_message.text) {
    let text_message = received_message.text.toLowerCase();
    let responseText;
    if (text_message.indexOf(lazada) !== -1) {
      responseText = "Địa chỉ Lazada là https://lazada.vn/shop/kidcareshop";
    } else if (text_message.indexOf(shopee) !== -1) {
      responseText = "Địa chỉ Shopee là https://shopee.vn/shop/kidcareshop";
    } else if (text_message.match(/sdt|số điện thoại|so dien thoai/)) {
      responseText = "08 88 58 18 00";
    } else {
      return;
    }
    response = {"text": responseText};
  } else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }

  callSendAPI(sender_psid, response);
}


// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;
  console.log("Postback " + payload);
  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct message body
  let request_body = {
    "recipient":{"id":sender_psid},
    "message": response
  }

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}
