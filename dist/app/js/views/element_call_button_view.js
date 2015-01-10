define(["exports", "components/fxos-mvc/dist/mvc", "components/gaia-button/gaia-button"], function (exports, _componentsFxosMvcDistMvc, _componentsGaiaButtonGaiaButton) {
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

  var View = _componentsFxosMvcDistMvc.View;


  (function (window) {
    "use strict";

    var shadowTemplate = "<style scoped>\ngaia-button {\n\t--button-background: green;\n\t--button-background-active: lightgreen;\n\t--button-color: white;\n\t--button-color-active: white;\n\twidth: 10rem;\n\tmin-width: 0 !important;\n\tmargin: 0.5rem !important;\n}\n</style>\n<gaia-button>Call</gaia-button>";

    var proto;

    var ElementCallButtonView = (function (View) {
      var ElementCallButtonView = function ElementCallButtonView(controller, phoneFieldController) {
        proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = this._createdCallback;
        proto._scope = this;
        this._controller = controller;
        this._phoneFieldController = phoneFieldController;

        document.registerElement("fxos-call-button", { prototype: proto });
      };

      _extends(ElementCallButtonView, View);

      ElementCallButtonView.prototype._createdCallback = function () {
        this.shadow = this.createShadowRoot();
        this.shadow.innerHTML = shadowTemplate;

        var scope = proto._scope;
        var controller = scope._controller;

        this.shadow.addEventListener("click", controller.handleClick.bind(controller));
      };

      ElementCallButtonView.prototype.phoneNumber = function () {
        return this._phoneFieldController.phoneField;
      };

      ElementCallButtonView.prototype.template = function () {
        return "<fxos-call-button></fxos-call-button>";
      };

      return ElementCallButtonView;
    })(View);

    exports["default"] = ElementCallButtonView;
  })(window);
});