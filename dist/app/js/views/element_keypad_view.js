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

    var shadowTemplate = "<style scoped>\n#container {\n\tmargin: 0;\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n\tflex-flow: row wrap;\n}\n\n#container gaia-button {\n\t--button-background: teal;\n\t--button-background-active: blue;\n\t--button-color: white;\n\t--button-color-active: white;\n\n\tmin-width: 0 !important;\n\twidth: calc(33% - 1rem);\n\tmargin: 0.5rem;\n\n\ttext-align: center;\n}\n\n#container gaia-button span {\n\tmargin-left: 0.5rem;\n\tcolor: #aaa;\n}\n\n#container fxos-phone-field {\n\twidth: 100%;\n}\n</style>\n<div id=\"container\">\n\t<fxos-phone-field id=\"phoneField\"></fxos-phone-field>\n\t<gaia-button data-digit=\"1\">1 <span>\u221e</span></gaia-button>\n\t<gaia-button data-digit=\"2\">2 <span>ABC</span></gaia-button>\n\t<gaia-button data-digit=\"3\">3 <span>DEF</span></gaia-button>\n\t<gaia-button data-digit=\"4\">4 <span>GHI</span></gaia-button>\n\t<gaia-button data-digit=\"5\">5 <span>JKL</span></gaia-button>\n\t<gaia-button data-digit=\"6\">6 <span>MNO</span></gaia-button>\n\t<gaia-button data-digit=\"7\">7 <span>PQRS</span></gaia-button>\n\t<gaia-button data-digit=\"8\">8 <span>TUV</span></gaia-button>\n\t<gaia-button data-digit=\"9\">9 <span>WXYZ</span></gaia-button>\n\t<gaia-button data-digit=\"#\">#</gaia-button>\n\t<gaia-button data-digit=\"0\">0 <span>+</span></gaia-button>\n\t<gaia-button data-digit=\"*\">*</gaia-button>\n\t<fxos-call-button data-phone-field=\"phoneField\"></fxos-call-button>\n</div>";

    var proto;

    var ElementKeypadView = (function (View) {
      var ElementKeypadView = function ElementKeypadView(controller) {
        proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = this._createdCallback;
        proto._controller = controller;

        document.registerElement("fxos-keypad", { prototype: proto });
      };

      _extends(ElementKeypadView, View);

      ElementKeypadView.prototype._createdCallback = function () {
        this.shadow = this.createShadowRoot();
        this.shadow.innerHTML = shadowTemplate;

        // XXX/drs: This is pretty bad, and we shouldn't be referring directly
        // to `proto` like this. Need to figure out sane scoping here.
        this.shadow.addEventListener("click", proto._controller.handleClick.bind(proto._controller));
      };

      ElementKeypadView.prototype.template = function () {
        return "<fxos-keypad></fxos-keypad>";
      };

      return ElementKeypadView;
    })(View);

    exports["default"] = ElementKeypadView;
  })(window);
});