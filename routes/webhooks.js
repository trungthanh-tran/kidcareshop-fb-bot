// ===== MODULES ===============================================================
import express  from 'express';
import handleMessage from '../utils/receive';
import handlePostback from '../utils/receive';
const router = express.Router();

router.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  if (body.object === 'page') {
    body.entry.forEach( function(entry) {
      let facebookPageId = entry.id;
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      let sender_psid = webhook_event.sender.id;
      if (webhook_event.message) {
        handleMessage(facebookPageId, sender_psid, webhook_event.message);
      } else if(webhook_event.postback) {
        handlePostback(facebookPageId, sender_psid, webhook_event.postback);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.status(200).send("OK");
  }
});

router.get("/", (req, res) => {
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

export default router;
