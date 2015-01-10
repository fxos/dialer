define(["exports", "components/fxos-mvc/dist/mvc", "components/gaia-button/gaia-button"], function (exports, _componentsFxosMvcDistMvc, _componentsGaiaButtonGaiaButton) {
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

  var View = _componentsFxosMvcDistMvc.View;


  (function (window) {
    "use strict";

    var shadowTemplate = "<style scoped>\n#container {\n\tborder-bottom: 1px #ccc;\n\tbackground: #eee;\n\tdisplay: flex;\n\theight: 4rem;\n}\n\ninput {\n\tflex-grow: 1;\n\tborder: none;\n\tuser-select: none;\n\tfont-size: 18px;\n}\n\n#deleteButton {\n\tbackground: red;\n\ttransition: background 500ms ease 200ms;\n\twidth: 4rem;\n\tcolor: white;\n\ttext-align: center;\n\tvertical-align: middle;\n\tfont-size: 18px;\n}\n\n#deleteButton:active {\n\tbackground: lightcoral;\n\ttransition: none;\n}\n</style>\n<div id=\"container\">\n\t<input id=\"phoneField\" type=\"phone\"></input>\n\t<button id=\"deleteButton\">X</button>\n</div>";

    var proto;

    var ElementPhoneFieldView = (function (View) {
      var ElementPhoneFieldView = function ElementPhoneFieldView(controller) {
        proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = this._createdCallback;
        proto._scope = this;
        this._controller = controller;

        document.registerElement("fxos-phone-field", { prototype: proto });
      };

      _extends(ElementPhoneFieldView, View);

      ElementPhoneFieldView.prototype._createdCallback = function () {
        this.shadow = this.createShadowRoot();
        this.shadow.innerHTML = shadowTemplate;

        // XXX/drs: This is pretty bad. Suggestions?
        var scope = this._scope;
        var controller = scope._controller;

        scope._phoneField = this.shadow.getElementById("phoneField");
        scope._deleteButton = this.shadow.getElementById("deleteButton");

        scope._deleteButton.addEventListener("click", controller.handleClick.bind(controller));
        scope._deleteButton.addEventListener("contextmenu", controller.handleContextMenu.bind(controller));
      };

      ElementPhoneFieldView.prototype.template = function () {
        return "<fxos-phone-field></fxos-phone-field>";
      };

      _classProps(ElementPhoneFieldView, null, {
        phoneField: {
          get: function () {
            return this._phoneField.value;
          },
          set: function (value) {
            this._phoneField.value = value;
          }
        }
      });

      return ElementPhoneFieldView;
    })(View);

    exports["default"] = ElementPhoneFieldView;
  })(window);
});