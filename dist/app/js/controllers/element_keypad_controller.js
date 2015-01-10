define(["exports", "js/views/element_keypad_view", "components/fxos-mvc/dist/mvc", "js/controllers/element_call_button_controller", "js/controllers/element_phone_field_controller"], function (exports, _jsViewsElementKeypadView, _componentsFxosMvcDistMvc, _jsControllersElementCallButtonController, _jsControllersElementPhoneFieldController) {
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

  var ElementKeypadView = _jsViewsElementKeypadView["default"];
  var Controller = _componentsFxosMvcDistMvc.Controller;
  var ElementCallButtonController = _jsControllersElementCallButtonController["default"];
  var ElementPhoneFieldController = _jsControllersElementPhoneFieldController["default"];
  var ElementKeypadController = (function (Controller) {
    var ElementKeypadController = function ElementKeypadController() {
      this._phoneFieldController = new ElementPhoneFieldController();
      this._callButtonController = new ElementCallButtonController(this._phoneFieldController);
      this.view = new ElementKeypadView(this);
    };

    _extends(ElementKeypadController, Controller);

    ElementKeypadController.prototype.handleClick = function (e) {
      var digit = e.target.dataset.digit;
      if (!digit) {
        return;
      }

      this._phoneFieldController.addDigit(digit);
      navigator.vibrate(50);
    };

    return ElementKeypadController;
  })(Controller);

  exports["default"] = ElementKeypadController;
});