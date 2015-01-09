import 'components/gaia-button/gaia-button';

(function(window) {
'use strict';

var proto = Object.create(HTMLElement.prototype);

var template =
`<style scoped>
gaia-button {
	--button-background: green;
	--button-background-active: lightgreen;
	--button-color: white;
	--button-color-active: white;
	width: 10rem;
}
</style>
<gaia-button>Call</gaia-button>`;

proto.createdCallback = function() {
	var shadow = this.createShadowRoot();
	shadow.innerHTML = template;

	shadow.addEventListener('click', this.handleClick.bind(this));

	this._phoneField = document.getElementById(this.dataset.phoneField);
};

proto.handleClick = function(e) {
	var telephony = navigator.mozTelephony;
	telephony.dial(this._phoneField.value);
};

var FXOSCallButton = document.registerElement('fxos-call-button', {
	prototype: proto
});

window.FXOSCallButton = FXOSCallButton;

})(window);
