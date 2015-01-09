import 'components/gaia-button/gaia-button';

(function(window) {
'use strict';

var proto = Object.create(HTMLElement.prototype);

var template =
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

proto.createdCallback = function() {
	var shadow = this.createShadowRoot();
	shadow.innerHTML = template;

	this._phoneField = shadow.getElementById('phoneField');
	this._deleteButton = shadow.getElementById('deleteButton');

	this._deleteButton.addEventListener('click', this.deleteDigit.bind(this));
	this._deleteButton.addEventListener('contextmenu',
										this.deleteDigits.bind(this));
};

proto.addDigit = function(digit) {
	this._phoneField.value += digit;
	//this._phoneField.value = this._phoneField.value.slice(0, 150);
};

proto.deleteDigit = function() {
	this._phoneField.value = this._phoneField.value.slice(0, -1);
};

proto.deleteDigits = function() {
	this._phoneField.value = '';
};

var FXOSPhoneField = document.registerElement('fxos-phone-field', {
	prototype: proto
});

window.FXOSPhoneField = FXOSPhoneField;

})(window);
