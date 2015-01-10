define(["exports", "js/views/element_phone_field_view", "components/fxos-mvc/dist/mvc"], function (exports, _jsViewsElementPhoneFieldView, _componentsFxosMvcDistMvc) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

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

  var ElementPhoneFieldView = _jsViewsElementPhoneFieldView["default"];
  var Controller = _componentsFxosMvcDistMvc.Controller;
  var ElementPhoneFieldController = (function (Controller) {
    var ElementPhoneFieldController = function ElementPhoneFieldController() {
      this.view = new ElementPhoneFieldView(this);
    };

    _extends(ElementPhoneFieldController, Controller);

    ElementPhoneFieldController.prototype.handleClick = function (e) {
      // Delete button was tapped.
      this.view.phoneField = this.view.phoneField.slice(0, -1);
    };

    ElementPhoneFieldController.prototype.handleContextMenu = function (e) {
      this.view.phoneField = "";
    };

    ElementPhoneFieldController.prototype.addDigit = function (digit) {
      this.view.phoneField += digit;
    };

    _classProps(ElementPhoneFieldController, null, {
      phoneField: {
        get: function () {
          return this.view.phoneField;
        }
      }
    });

    return ElementPhoneFieldController;
  })(Controller);

  exports["default"] = ElementPhoneFieldController;
});