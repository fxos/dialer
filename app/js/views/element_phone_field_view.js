import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-button/gaia-button';

(function(window) {
'use strict';

var shadowTemplate =
`<style scoped>
#container {
	border-bottom: 1px #ccc;
	background: #eee;
	display: flex;
	height: 4rem;
}

input {
	flex-grow: 1;
	border: none;
	user-select: none;
	font-size: 18px;
}

#deleteButton {
	background: red;
	transition: background 500ms ease 200ms;
	width: 4rem;
	color: white;
	text-align: center;
	vertical-align: middle;
	font-size: 18px;
}

#deleteButton:active {
	background: lightcoral;
	transition: none;
}
</style>
<div id="container">
	<input id="phoneField" type="phone"></input>
	<button id="deleteButton">X</button>
</div>`;

var proto;

export default class ElementPhoneFieldView extends View {
	constructor(controller) {
		proto = Object.create(HTMLElement.prototype);
		proto.createdCallback = this._createdCallback;
		proto._scope = this;
		this._controller = controller;

		document.registerElement('fxos-phone-field', { prototype: proto });
	}

	_createdCallback() {
		this.shadow = this.createShadowRoot();
		this.shadow.innerHTML = shadowTemplate;

		// XXX/drs: This is pretty bad. Suggestions?
		var scope = this._scope;
		var controller = scope._controller;

		scope._phoneField = this.shadow.getElementById('phoneField');
		scope._deleteButton = this.shadow.getElementById('deleteButton');

		scope._deleteButton.addEventListener(
			'click', controller.handleClick.bind(controller));
		scope._deleteButton.addEventListener(
			'contextmenu', controller.handleContextMenu.bind(controller));
	}

	get phoneField() {
		return this._phoneField.value;
	}

	set phoneField(value) {
		this._phoneField.value = value;
	}

	template() {
		return '<fxos-phone-field></fxos-phone-field>';
	}
}

})(window);
