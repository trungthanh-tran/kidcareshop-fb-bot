'use strict'
import FacebookItem from "./item";

// Facebook Text item
export default class FacebookButtonTemplate extends FacebookItem {
  constructor(title, buttonsList) {
    super();
    this.payload= {};
    this.payload.template_type = "button";
    this.payload.text = title;

    //if(Array.isArray(buttonsList)) {
    //  throw new TypeError("Invalid button list");
    //}
    this.payload.button = buttonsList;
  }
}
