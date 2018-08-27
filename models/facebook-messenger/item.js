'use strict'

export default class FacebookItem {
  /*static checkEnforceAbstractFuctions(object) {
    // Abstract class
    var abstractFunctions = ['buildItem'];
    var objectPrototye = Object.getPrototypeOf(object);
    abstractFunctions.forEach(function(aFunction){
      if( ! objectPrototye.hasOwnProperty(aFunction)) {
        throw new TypeError(aFunction + " function is not implemented");
      }
    });

  }*/

  constructor() {
    if (this.constructor === FacebookItem) {
      throw new TypeError("Abstract FacebookItem cannot be initiated");
    }
  }


  buildItem() {
    return JSON.stringify(this);
  }
}
