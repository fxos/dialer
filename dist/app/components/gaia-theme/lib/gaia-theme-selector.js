define(["exports"], function (exports) {
  "use strict";

  (function (define) {
    "use strict";define(function (require, exports, module) {
      /*jshint esnext:true*/

      /**
       * Extend from the `HTMLElement` prototype
       *
       * @type {Object}
       */
      var proto = Object.create(HTMLElement.prototype);

      proto.createdCallback = function () {
        this.createShadowRoot().innerHTML = template;

        this.els = {
          themes: this.shadowRoot.querySelector(".themes"),
          rtl: this.shadowRoot.querySelector(".toggle-rtl")
        };

        this.els.rtl.addEventListener("click", this.onRtlClick.bind(this));
        this.els.themes.addEventListener("click", this.onThemeClick.bind(this));
        this.styleHack();
        this.set(localStorage.theme || "settings");
      };

      proto.styleHack = function () {
        var style = this.shadowRoot.querySelector("style");
        style.setAttribute("scoped", "");
        this.appendChild(style.cloneNode(true));
      };

      proto.onThemeClick = function (e) {
        var theme = e.target.value;
        if (theme) {
          this.set(theme);
        }
      };

      proto.onRtlClick = function () {
        document.dir = this.els.rtl.checked ? "rtl" : "ltr";
      };

      proto.set = function (theme) {
        var radio = this.shadowRoot.querySelector("[value=\"" + theme + "\"]");
        document.body.classList.remove("theme-" + this.theme);
        document.body.classList.add("theme-" + theme);
        radio.checked = true;
        this.theme = theme;
        localStorage.theme = theme;
      };

      var template = "\n<style>\n\n* { margin: 0; padding: 0; }\n\ngaia-theme-selector {\n  position: fixed;\n  top: 0; left: 0;\n  z-index: 101;\n  width: 100%;\n  height: 30px;\n  background: rgba(255,255,255,0.8);\n  color: #000;\n  font-size: 9px;\n  text-align: center;\n  box-shadow: 0 1px 1px rgba(0,0,0,0.1);\n  direction: ltr;\n}\n\nform {\n  display: flex;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n}\n\nform label {\n  -moz-margin-start: 9px;\n}\n\nform input {\n  -moz-margin-end: 6px;\n  vertical-align: middle;\n}\n\n.rtl {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n\n  display: flex;\n  align-items: center;\n}\n\n</style>\n\n<form>\n  <label class=\"rtl\"><input type=\"checkbox\" class=\"toggle-rtl\" />RTL</label>\n  <span class=\"themes\">\n    <label><input type=\"radio\" name=\"theme\" value=\"productivity\"/>Prod</label>\n    <label><input type=\"radio\" name=\"theme\" value=\"communications\"/>Comms</label>\n    <label><input type=\"radio\" name=\"theme\" value=\"media\"/>Media</label>\n    <label><input type=\"radio\" name=\"theme\" value=\"settings\"/>Settings</label>\n  </span>\n</form>";

      document.registerElement("gaia-theme-selector", { prototype: proto });
    });
  })((function (n, w) {
    "use strict";return typeof define == "function" && define.amd ? define : typeof module == "object" ? function (c) {
      c(require, exports, module);
    } : function (c) {
      var m = { exports: {} }, r = function (n) {
        return w[n];
      };
      w[n] = c(r, m.exports, m) || m.exports;
    };
  })("gaia-theme-selector", this));
});