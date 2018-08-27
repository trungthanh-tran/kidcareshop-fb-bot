'use strict'
import util from 'util';
import FacebookItem from './item';
// Facebook Text item
export default class FacebookTextElement extends FacebookItem {
  constructor(_value) {
    super();
    this.text = _value;
  }
}
