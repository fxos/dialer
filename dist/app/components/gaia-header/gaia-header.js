define(["exports"], function (exports) {
  "use strict";

  ;(function (define) {
    "use strict";define(function (require, exports, module) {
      /*jshint esnext:true*/

      /**
       * Dependencies
       */

      var Component = require("gaia-component");
      var fontFit = require("./lib/font-fit");

      // Load 'gaia-icons' font-family
      require("gaia-icons");

      /**
       * Supported action types
       *
       * @type {Object}
       */
      var actionTypes = { menu: 1, back: 1, close: 1 };

      /**
       * Register the component.
       *
       * @return {Element} constructor
       */
      module.exports = Component.register("gaia-header", {
        /**
         * Called when the element is first created.
         *
         * Here we create the shadow-root and
         * inject our template into it.
         *
         * @private
         */
        created: function () {
          var _this = this;
          this.createShadowRoot().innerHTML = this.template;

          // Get els
          this.els = {
            actionButton: this.shadowRoot.querySelector(".action-button"),
            headings: this.querySelectorAll("h1,h2,h3,h4"),
            inner: this.shadowRoot.querySelector(".inner")
          };

          this.els.actionButton.addEventListener("click", function (e) {
            return _this.onActionButtonClick(e);
          });
          this.configureActionButton();
          this.runFontFit();
        },

        /**
         * Called when the element is
         * attached to the DOM.
         *
         * @private
         */
        attached: function () {
          this.rerunFontFit();
        },

        /**
         * Called when one of the attributes
         * on the element changes.
         *
         * @private
         */
        attributeChanged: function (attr) {
          if (attr === "action") {
            this.configureActionButton();
            this.rerunFontFit();
          }
        },

        /**
         * Runs the logic to size and position
         * header text inside the available space.
         *
         * @private
         */
        runFontFit: function () {
          for (var i = 0; i < this.els.headings.length; i++) {
            fontFit.reformatHeading(this.els.headings[i]);
            fontFit.observeHeadingChanges(this.els.headings[i]);
          }
        },

        /**
         * Rerun font-fit logic.
         *
         * TODO: We really need an official API for this.
         *
         * @private
         */
        rerunFontFit: function () {
          for (var i = 0; i < this.els.headings.length; i++) {
            fontFit.reformatHeading(this.els.headings[i]);
          }
        },

        /**
         * Triggers the 'action' button
         * (used in testing).
         *
         * @public
         */
        triggerAction: function () {
          if (this.isSupportedAction(this.getAttribute("action"))) {
            this.els.actionButton.click();
          }
        },

        /**
         * Configure the action button based
         * on the value of the `data-action`
         * attribute.
         *
         * @private
         */
        configureActionButton: function () {
          var old = this.els.actionButton.getAttribute("icon");
          var type = this.getAttribute("action");
          var supported = this.isSupportedAction(type);
          this.els.actionButton.classList.remove("icon-" + old);
          this.els.actionButton.setAttribute("icon", type);
          this.els.inner.classList.toggle("supported-action", supported);
          if (supported) {
            this.els.actionButton.classList.add("icon-" + type);
          }
        },

        /**
         * Validate action against supported list.
         *
         * @private
         */
        isSupportedAction: function (action) {
          return action && actionTypes[action];
        },

        /**
         * Handle clicks on the action button.
         *
         * Fired async to allow the 'click' event
         * to finish its event path before
         * dispatching the 'action' event.
         *
         * @param  {Event} e
         * @private
         */
        onActionButtonClick: function (e) {
          var config = { detail: { type: this.getAttribute("action") } };
          var actionEvent = new CustomEvent("action", config);
          setTimeout(this.dispatchEvent.bind(this, actionEvent));
        },

        template: "\n  <style>\n\n  :host {\n    display: block;\n\n    --gaia-header-button-color:\n      var(--header-button-color,\n      var(--header-color,\n      var(--link-color,\n      inherit)));\n  }\n\n  /**\n   * [hidden]\n   */\n\n  :host[hidden] {\n    display: none;\n  }\n\n  /** Reset\n   ---------------------------------------------------------*/\n\n  ::-moz-focus-inner { border: 0; }\n\n  /** Inner\n   ---------------------------------------------------------*/\n\n  .inner {\n    display: flex;\n    min-height: 50px;\n    direction: ltr;\n\n    background:\n      var(--header-background,\n      var(--background,\n      #fff));\n  }\n\n  /** Action Button\n   ---------------------------------------------------------*/\n\n  /**\n   * 1. Hidden by default\n   */\n\n  .action-button {\n    display: none; /* 1 */\n    position: relative;\n    width: 50px;\n    font-size: 30px;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    align-items: center;\n    background: none;\n    cursor: pointer;\n    transition: opacity 200ms 280ms;\n\n    color:\n      var(--header-action-button-color,\n      var(--header-icon-color,\n      var(--gaia-header-button-color)));\n  }\n\n  /**\n   * .action-supported\n   *\n   * 1. For icon vertical-alignment\n   */\n\n  .supported-action .action-button {\n    display: flex; /* 1 */\n  }\n\n  /**\n   * :active\n   */\n\n  .action-button:active {\n    transition: none;\n    opacity: 0.2;\n  }\n\n  /** Action Button Icon\n   ---------------------------------------------------------*/\n\n  /**\n   * 1. To enable vertical alignment.\n   */\n\n  .action-button:before {\n    display: block;\n  }\n\n  /** Action Button Text\n   ---------------------------------------------------------*/\n\n  /**\n   * To provide custom localized content for\n   * the action-button, we allow the user\n   * to provide an element with the class\n   * .l10n-action. This node is then\n   * pulled inside the real action-button.\n   *\n   * Example:\n   *\n   *   <gaia-header action=\"back\">\n   *     <span class=\"l10n-action\" aria-label=\"Back\">Localized text</span>\n   *     <h1>title</h1>\n   *   </gaia-header>\n   */\n\n  ::content .l10n-action {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    font-size: 0;\n  }\n\n  /** Title\n   ---------------------------------------------------------*/\n\n  /**\n   * 1. Vertically center text. We can't use flexbox\n   *    here as it breaks text-overflow ellipsis\n   *    without an inner div.\n   */\n\n  ::content h1 {\n    flex: 1;\n    margin: 0;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    text-align: center;\n    line-height: 50px; /* 1 */\n    font-weight: 300;\n    font-style: italic;\n    font-size: 24px;\n    -moz-user-select: none;\n\n    color:\n      var(--header-title-color,\n      var(--header-color,\n      var(--title-color,\n      var(--text-color,\n      inherit))));\n  }\n\n  /**\n   * .flush-left\n   *\n   * When the fitted text is flush with the\n   * edge of the left edge of the container\n   * we pad it in a bit.\n   */\n\n  ::content h1.flush-left {\n    padding-left: 10px;\n  }\n\n  /**\n   * .flush-right\n   *\n   * When the fitted text is flush with the\n   * edge of the right edge of the container\n   * we pad it in a bit.\n   */\n\n  ::content h1.flush-right {\n    padding-right: 10px; /* 1 */\n  }\n\n  /** Buttons\n   ---------------------------------------------------------*/\n\n  ::content a,\n  ::content button {\n    box-sizing: border-box;\n    display: flex;\n    border: none;\n    width: auto;\n    height: auto;\n    margin: 0;\n    padding: 0 10px;\n    font-size: 14px;\n    line-height: 1;\n    min-width: 50px;\n    align-items: center;\n    justify-content: center;\n    text-decoration: none;\n    text-align: center;\n    background: none;\n    border-radius: 0;\n    font-style: italic;\n    cursor: pointer;\n\n    transition: opacity 200ms 280ms;\n\n    color:\n      var(--gaia-header-button-color);\n  }\n\n  /**\n   * :active\n   */\n\n  ::content a:active,\n  ::content button:active {\n    transition: none;\n    opacity: 0.2;\n  }\n\n  /**\n   * [hidden]\n   */\n\n  ::content a[hidden],\n  ::content button[hidden] {\n    display: none;\n  }\n\n  /**\n   * [disabled]\n   */\n\n  ::content a[disabled],\n  ::content button[disabled] {\n    pointer-events: none;\n    color: var(--header-disabled-button-color);\n  }\n\n  /** Icon Buttons\n   ---------------------------------------------------------*/\n\n  /**\n   * Icons are a different color to text\n   */\n\n  ::content .icon,\n  ::content [data-icon] {\n    color:\n      var(--header-icon-color,\n      var(--gaia-header-button-color));\n  }\n\n  /** Icons\n   ---------------------------------------------------------*/\n\n  [class^=\"icon-\"]:before,\n  [class*=\"icon-\"]:before {\n    font-family: 'gaia-icons';\n    font-style: normal;\n    text-rendering: optimizeLegibility;\n    font-weight: 500;\n  }\n\n  .icon-menu:before { content: 'menu'; }\n  .icon-close:before { content: 'close'; }\n  .icon-back:before { content: 'back'; }\n\n  </style>\n\n  <div class=\"inner\">\n    <button class=\"action-button\">\n      <content select=\".l10n-action\"></content>\n    </button>\n    <content select=\"h1,h2,h3,h4,a,button\"></content>\n  </div>"
      });
    });
  })(typeof define == "function" && define.amd ? define : (function (n, w) {
    "use strict";return typeof module == "object" ? function (c) {
      c(require, exports, module);
    } : function (c) {
      var m = { exports: {} };c(function (n) {
        return w[n];
      }, m.exports, m);w[n] = m.exports;
    };
  })("gaia-header", this));
});