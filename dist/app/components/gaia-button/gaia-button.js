define(["exports"], function (exports) {
  "use strict";

  (function (define) {
    define(function (require, exports, module) {
      /*jshint esnext:true*/
      "use strict";

      /**
       * Prototype extends from
       * the HTMLElement.
       *
       * @type {Object}
       */
      var proto = Object.create(HTMLButtonElement.prototype);

      proto.createdCallback = function () {
        this.createShadowRoot().innerHTML = template;
        this.els = {
          inner: this.shadowRoot.querySelector(".inner"),
          content: this.shadowRoot.querySelector(".content")
        };

        this.circular = this.hasAttribute("circular");
        this.disabled = this.hasAttribute("disabled");
        this.setAttribute("role", "button");
        this.tabIndex = 0;
        this.styleHack();
      };

      proto.attributeChangedCallback = function (attr, from, to) {
        if (this.attrs[attr]) {
          this[attr] = to;
        }
      };

      proto.styleHack = function () {
        var style = this.shadowRoot.querySelector("style").cloneNode(true);
        this.classList.add("-host", "-content");
        style.setAttribute("scoped", "");
        this.appendChild(style);
      };

      proto.attrs = {
        circular: {
          get: function () {
            this.getAttribute("circular");
          },
          set: function (value) {
            value = !!(value === "" || value);
            if (value) {
              this.setAttribute("circular", "");
              this.els.inner.setAttribute("circular", "");
            } else {
              this.removeAttribute("circular");
              this.els.inner.removeAttribute("circular");
            }
          }
        },

        disabled: {
          get: function () {
            this.getAttribute("disabled");
          },
          set: function (value) {
            value = !!(value === "" || value);
            if (value) {
              this.setAttribute("disabled", "");
              this.els.inner.setAttribute("disabled", "");
            } else {
              this.removeAttribute("disabled");
              this.els.inner.removeAttribute("disabled");
            }
          }
        }
      };

      Object.defineProperties(proto, proto.attrs);

      var template = "\n<style>\n\n.-host {\n  display: inline-block;\n  box-sizing: border-box;\n  min-width: 50%;\n  margin: 0 var(--base-m, 18px) var(--base-m, 18px);\n  outline: 0;\n}\n\n@media(min-width:500px) {\n  .-host { min-width: 140px; }\n}\n\n.-host[circular] {\n  width: 50px;\n  min-width: 0;\n}\n\n/** Inner\n ---------------------------------------------------------*/\n\n.inner {\n  position: relative;\n  height: 50px;\n  border-radius: 50px;\n  overflow: hidden;\n  cursor: pointer;\n  -moz-user-select: none;\n  line-height: 1;\n  transition: color 0ms 300ms;\n\n  background:\n    var(--button-background,\n    var(--input-background,\n    var(--background-plus,\n    #fff)));\n\n  color:\n    var(--button-color,\n    var(--text-color,\n    inherit));\n\n  box-shadow:\n    var(--button-box-shadow,\n    var(--box-shadow,\n    none));\n}\n\n/**\n * [circular]\n */\n\n.inner[circular] {\n  border-radius: 50%;\n}\n\n/**\n * [disabled]\n */\n\n.inner[disabled] {\n  pointer-events: none;\n  opacity: 0.5;\n}\n\n/**\n * .pressed\n */\n\n.inner:active {\n  transition: none;\n  color: var(--button-color-active, #fff);\n  box-shadow: var(--button-box-shadow-active, none);\n}\n\n/** Background\n ---------------------------------------------------------*/\n\n.background {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n\n  transition: opacity 500ms 200ms;\n\n  background:\n    var(--button-background-active,\n    var(--highlight-color,\n    #333));\n}\n\n:active .background {\n  transition: none;\n  opacity: 1;\n}\n\n.released .background {\n  transition: opacity 500ms;\n}\n\ni:before {\n  font-size: 26px;\n}\n\n.-content i {\n  margin-left: -2px;\n  margin-right: -2px;\n}\n\n.-content i + span,\n.-content span + i {\n  -moz-margin-start: 8px;\n}\n\n\n\n/** Content\n ---------------------------------------------------------*/\n\n/**\n * 1. In some cases events seems to be getting\n *    swallowed by text-nodes. Ignoring pointer-\n *    events means we can listen on parent nodes\n *    instead.\n */\n\n.content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  z-index: 2;\n  height: 100%;\n  padding: 0 18px;\n  font-style: italic;\n  font-size: 17px;\n  pointer-events: none; /* 1 */\n}\n\n[circular] .content {\n  padding: 0;\n}\n\n</style>\n<div class=\"inner\">\n  <div class=\"background\"></div>\n  <div class=\"content\"><content></content></div>\n</div>";

      module.exports = document.registerElement("gaia-button", { prototype: proto });
    });
  })((function (n, w) {
    return typeof define == "function" && define.amd ? define : typeof module == "object" ? function (c) {
      c(require, exports, module);
    } : function (c) {
      var m = { exports: {} }, r = function (n) {
        return w[n];
      };w[n] = c(r, m.exports, m) || m.exports;
    };
  })("gaia-button", this));
});