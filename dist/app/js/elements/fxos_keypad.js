define(["exports", "js/elements/fxos_call_button", "js/elements/fxos_phone_field", "components/gaia-button/gaia-button"], function (exports, _jsElementsFxosCallButton, _jsElementsFxosPhoneField, _componentsGaiaButtonGaiaButton) {
  "use strict";

  (function (window) {
    "use strict";

    var proto = Object.create(HTMLElement.prototype);

    var template = "<style scoped>\n#container {\n\tmargin: 0;\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n\tflex-flow: row wrap;\n}\n\n#container gaia-button {\n\t--button-background: teal;\n\t--button-background-active: blue;\n\t--button-color: white;\n\t--button-color-active: white;\n\n\tmin-width: 0 !important;\n\twidth: calc(33% - 1rem);\n\tmargin: 0.5rem;\n\n\ttext-align: center;\n}\n\n#container gaia-button span {\n\tmargin-left: 0.5rem;\n\tcolor: #aaa;\n}\n\n#container fxos-phone-field {\n\twidth: 100%;\n}\n</style>\n<div id=\"container\">\n\t<fxos-phone-field id=\"phoneField\"></fxos-phone-field>\n\t<gaia-button data-digit=\"1\">1 <span>\u221e</span></gaia-button>\n\t<gaia-button data-digit=\"2\">2 <span>ABC</span></gaia-button>\n\t<gaia-button data-digit=\"3\">3 <span>DEF</span></gaia-button>\n\t<gaia-button data-digit=\"4\">4 <span>GHI</span></gaia-button>\n\t<gaia-button data-digit=\"5\">5 <span>JKL</span></gaia-button>\n\t<gaia-button data-digit=\"6\">6 <span>MNO</span></gaia-button>\n\t<gaia-button data-digit=\"7\">7 <span>PQRS</span></gaia-button>\n\t<gaia-button data-digit=\"8\">8 <span>TUV</span></gaia-button>\n\t<gaia-button data-digit=\"9\">9 <span>WXYZ</span></gaia-button>\n\t<gaia-button data-digit=\"#\">#</gaia-button>\n\t<gaia-button data-digit=\"0\">0 <span>+</span></gaia-button>\n\t<gaia-button data-digit=\"*\">*</gaia-button>\n\t<fxos-call-button data-phone-field=\"phoneField\"></fxos-call-button>\n</div>";

    proto.createdCallback = function () {
      var shadow = this.createShadowRoot();
      shadow.innerHTML = template;

      shadow.addEventListener("click", this.handleClick.bind(this));

      this._phoneField = shadow.getElementById("phoneField");
    };

    proto.handleClick = function (e) {
      var digit = e.target.dataset.digit;
      if (!digit) {
        return;
      }

      this._phoneField.addDigit(digit);
      navigator.vibrate(50);
    };

    var FXOSKeypad = document.registerElement("fxos-keypad", {
      prototype: proto
    });

    window.FXOSKeypad = FXOSKeypad;
  })(window);
});