define(["exports", "components/gaia-button/gaia-button"], function (exports, _componentsGaiaButtonGaiaButton) {
  "use strict";

  (function (window) {
    "use strict";

    var proto = Object.create(HTMLElement.prototype);

    var template = "<style scoped>\n#container {\n\tborder-bottom: 1px #ccc;\n\tbackground: #eee;\n\tdisplay: flex;\n\theight: 4rem;\n}\n\ninput {\n\tflex-grow: 1;\n\tborder: none;\n\tuser-select: none;\n\tfont-size: 18px;\n}\n\n#deleteButton {\n\tbackground: red;\n\ttransition: background 500ms ease 200ms;\n\twidth: 4rem;\n\tcolor: white;\n\ttext-align: center;\n\tvertical-align: middle;\n\tfont-size: 18px;\n}\n\n#deleteButton:active {\n\tbackground: lightcoral;\n\ttransition: none;\n}\n</style>\n<div id=\"container\">\n\t<input id=\"phoneField\" type=\"phone\"></input>\n\t<button id=\"deleteButton\">X</button>\n</div>";

    proto.createdCallback = function () {
      var shadow = this.createShadowRoot();
      shadow.innerHTML = template;

      this._phoneField = shadow.getElementById("phoneField");
      this._deleteButton = shadow.getElementById("deleteButton");

      this._deleteButton.addEventListener("click", this.deleteDigit.bind(this));
      this._deleteButton.addEventListener("contextmenu", this.deleteDigits.bind(this));
    };

    proto.addDigit = function (digit) {
      this._phoneField.value += digit;
      //this._phoneField.value = this._phoneField.value.slice(0, 150);
    };

    proto.deleteDigit = function () {
      this._phoneField.value = this._phoneField.value.slice(0, -1);
    };

    proto.deleteDigits = function () {
      this._phoneField.value = "";
    };

    var FXOSPhoneField = document.registerElement("fxos-phone-field", {
      prototype: proto
    });

    window.FXOSPhoneField = FXOSPhoneField;
  })(window);
});