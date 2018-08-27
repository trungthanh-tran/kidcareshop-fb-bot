import FacebookTextElement from  "../models/facebook-messenger/text";
import FacebookButtonElement from  "../models/facebook-messenger/button";
import FacebookButtonTemplate from  "../models/facebook-messenger/button-template";
import callSendAPI from "./send";

// Handles messages events
const
  LAZADA_BUTTON = new FacebookButtonElement("postback","Lazada website","lazada"),
  SHOPEE_BUTTON = new FacebookButtonElement("postback","Shopee website","shopee"),
  TELEPHONE_BUTTON = new FacebookButtonElement("postback","Telephone number","telephone");

const handleFacebookMessage = (pageId, sender_psid, received_message) => {
  let response;
  let lazada = "lazada";
  let shopee = "shopee";
  let website = "website";
  let list = "list";
  if (received_message.text) {
    let text_message = received_message.text.toLowerCase();
    let responseText;
    if (text_message.indexOf("list") !== -1) {
      // Send website list
      var buttonList = [];
      buttonList.push(LAZADA_BUTTON);
      buttonList.push(SHOPEE_BUTTON);
      buttonList.push(TELEPHONE_BUTTON);
      responseText = new FacebookButtonTemplate("eCommerce kidcareshop", buttonList);
    } else if (text_message.indexOf(lazada) !== -1) {
      responseText = new FacebookTextElement("Địa chỉ Lazada là https://lazada.vn/shop/kidcareshop");
    } else if (text_message.indexOf(shopee) !== -1) {
      responseText = new FacebookTextElement("Địa chỉ Shopee là https://shopee.vn/shop/kidcareshop");
    } else if (text_message.match(/sdt|số điện thoại|so dien thoai/)) {
      responseText = new FacebookTextElement("08 88 58 18 00");
    } else {
      return;
    }
    response = responseText.buildItem();
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
  callSendAPI(pageId, sender_psid, response);
}


// Handles messaging_postbacks events
const handlePostback = (pageId, sender_psid, received_postback) => {
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
  callSendAPI(pageId, sender_psid, response);
}

export default {
  handlePostback,
  handleFacebookMessage
}
