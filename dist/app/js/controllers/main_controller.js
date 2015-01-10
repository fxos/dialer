define(["exports", "components/fxos-mvc/dist/mvc", "js/controllers/element_keypad_controller"], function (exports, _componentsFxosMvcDistMvc, _jsControllersElementKeypadController) {
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

  var Controller = _componentsFxosMvcDistMvc.Controller;
  var ElementKeypadController = _jsControllersElementKeypadController["default"];
  var MainController = (function (Controller) {
    var MainController = function MainController() {};

    _extends(MainController, Controller);

    MainController.prototype.main = function () {
      this._keypadController = new ElementKeypadController();
      document.body.innerHTML = this._keypadController.view.template();
    };

    return MainController;
  })(Controller);

  exports["default"] = MainController;
});