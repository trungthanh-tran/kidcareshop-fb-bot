'use strict'
const
  util = require('util'),
  FacebookItem = require("./item.js")
// Facebook Text item
module.exports = class FacebookButtonElement extends FacebookItem {
  constructor(buttonType, buttonTitle, buttonPayload) {
    super();
    this.type = buttonType;
    this.title = buttonTitle;
    this.payload = buttonPayload;
  }
}
