define(["exports", "js/views/element_call_button_view", "components/fxos-mvc/dist/mvc"], function (exports, _jsViewsElementCallButtonView, _componentsFxosMvcDistMvc) {
  "use strict";

  var _extends = function (child, parent) {
    child.prototype = Object.create(parent.prototype, {
      constructor: {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    child.__proto__ = parent;
  };

  var ElementCallButtonView = _jsViewsElementCallButtonView["default"];
  var Controller = _componentsFxosMvcDistMvc.Controller;
  var ElementCallButtonController = (function (Controller) {
    var ElementCallButtonController = function ElementCallButtonController(phoneFieldController) {
      this.view = new ElementCallButtonView(this, phoneFieldController);
    };

    _extends(ElementCallButtonController, Controller);

    ElementCallButtonController.prototype.handleClick = function (e) {
      navigator.mozTelephony.dial(this.view.phoneNumber());
    };

    return ElementCallButtonController;
  })(Controller);

  exports["default"] = ElementCallButtonController;
});