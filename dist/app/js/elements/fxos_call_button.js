define(["exports", "components/gaia-button/gaia-button"], function (exports, _componentsGaiaButtonGaiaButton) {
  "use strict";

  (function (window) {
    "use strict";

    var proto = Object.create(HTMLElement.prototype);

    var template = "<style scoped>\ngaia-button {\n\t--button-background: green;\n\t--button-background-active: lightgreen;\n\t--button-color: white;\n\t--button-color-active: white;\n\twidth: 10rem;\n}\n</style>\n<gaia-button>Call</gaia-button>";

    proto.createdCallback = function () {
      var shadow = this.createShadowRoot();
      shadow.innerHTML = template;

      shadow.addEventListener("click", this.handleClick.bind(this));

      this._phoneField = document.getElementById(this.dataset.phoneField);
    };

    proto.handleClick = function (e) {
      var telephony = navigator.mozTelephony;
      telephony.dial(this._phoneField.value);
    };

    var FXOSCallButton = document.registerElement("fxos-call-button", {
      prototype: proto
    });

    window.FXOSCallButton = FXOSCallButton;
  })(window);
});