import api from './api';

  /**
  Wrap json message object with receipt info
  **/
const messageToJson = (receiptId, messagePayload) =>{
  return {
    receipt: {
      id: receiptId
    },
    message: messagePayload
  };
};
/**
* Sends response messages via the Send API
* @param   {String}          facebookId - Facebook ID
* @param   {String}          senderPsid - Sender ID
* @param   {Object}          response - Response to send
* @returns {undefined}
*/
const callSendAPI = (facebookId, senderPsid, response) => // Sends response messages via the Send API {
{
  // Construct message body
  const requestBody = messageToJson(senderPsid, response);
  api.callMessagesAPI(facebookId, requestBody);
}


export default {
  callSendAPI
};
