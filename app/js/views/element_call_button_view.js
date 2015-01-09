import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-button/gaia-button';

(function(window) {
'use strict';

var shadowTemplate =
`<style scoped>
gaia-button {
	--button-background: green;
	--button-background-active: lightgreen;
	--button-color: white;
	--button-color-active: white;
	width: 10rem;
	min-width: 0 !important;
	margin: 0.5rem !important;
}
</style>
<gaia-button>Call</gaia-button>`;

var proto;

export default class ElementCallButtonView extends View {
	constructor(controller, phoneFieldController) {
		proto = Object.create(HTMLElement.prototype);
		proto.createdCallback = this._createdCallback;
		proto._scope = this;
		this._controller = controller;
		this._phoneFieldController = phoneFieldController;

		document.registerElement('fxos-call-button', { prototype: proto });
	}

	_createdCallback() {
		this.shadow = this.createShadowRoot();
		this.shadow.innerHTML = shadowTemplate;

		var scope = proto._scope;
		var controller = scope._controller;

		this.shadow.addEventListener('click',
									 controller.handleClick.bind(controller));
	}

	phoneNumber() {
		return this._phoneFieldController.phoneField;
	}

	template() {
		return '<fxos-call-button></fxos-call-button>';
	}
}

})(window);
