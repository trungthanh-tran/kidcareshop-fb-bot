'use strict'
const
  util = require('util'),
  FacebookItem = require("./facebook_item.js")
// Facebook Text item
module.exports = class FacebookTextElement extends FacebookItem {
  constructor(_value) {
    super();
    this.text = _value;
  }
}
