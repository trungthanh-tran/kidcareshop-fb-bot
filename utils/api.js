import request from 'request-promise';

/**
 * Send messages in order to the Facebook graph API.
 *
 * @param   {String}          endPoint - Specific endpoint to send data to
 * @param   {String}          facebookId - Facebook ID
 * @param   {Object|Object[]} payload - Payloads to send individually
 * @param   {Object}          queryParams - Query Parameters
 * @param   {Object}          retries - # of times to attempt to send a message.
 * @returns {undefined}
 */
const callAPI = (endPoint, facebookId, payload, queryParam ={}, retries = 5) => {
  // Error if developer forgot to specify an endpoint to send our request to
  if (!endPoint) {
    console.error('callAPI requires you specify an endpoint.');
    return;
  }
  // Error if we've run out of retries.
  if (retries < 0) {
    console.error(
      'No more retries left.',
      {endPoint, facebookId, payload, queryParams}
    );
    return;
  }
  const acesssToken = process.env.facebookId.PAGE_ACCESS_TOKEN
  const query = Object.assign({access_token: acesssToken}, queryParams);
  request({
    uri: `https://graph.facebook.com/v2.6/me/${endPoint}`,
    qs: query,
    method: 'POST',
    json: payload,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Message has been successfully received by Facebook.
      console.log(
        `Successfully sent message to ${endPoint} endpoint: `,
        JSON.stringify(body)
      );
    } else {
      // Message has not been successfully received by Facebook.
      console.error(
        `Failed calling Messenger API endpoint ${endPoint}`,
        response.statusCode,
        response.statusMessage,
        body.error,
        queryParams
      );

      // Retry the request
      console.error(`Retrying Request: ${retries} left`);
      callAPI(endPoint, payload, queryParams, retries - 1);
    }
  });
}

const callMessagesAPI = (facebookId, payload, queryParams = {}) => {
  return callAPI('messages', facebookId, payload, queryParams);
};

export default callMessagesAPI;
