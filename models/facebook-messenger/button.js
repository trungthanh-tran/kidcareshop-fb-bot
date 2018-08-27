'use strict'
import FacebookItem from "./item";
// Facebook Text item
export default class FacebookButtonElement extends FacebookItem {
  constructor(buttonType, buttonTitle, buttonPayload) {
    super();
    this.type = buttonType;
    this.title = buttonTitle;
    this.payload = buttonPayload;
  }
}
