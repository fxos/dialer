import /* FXOSCallButton from */ 'js/elements/fxos_call_button';
import /* FXOSPhoneField from */ 'js/elements/fxos_phone_field';
import 'components/gaia-button/gaia-button';

(function(window) {
'use strict';

var proto = Object.create(HTMLElement.prototype);

var template =
`<style scoped>
#container {
	margin: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	flex-flow: row wrap;
}

#container gaia-button {
	--button-background: teal;
	--button-background-active: blue;
	--button-color: white;
	--button-color-active: white;

	min-width: 0 !important;
	width: calc(33% - 1rem);
	margin: 0.5rem;

	text-align: center;
}

#container gaia-button span {
	margin-left: 0.5rem;
	color: #aaa;
}

#container fxos-phone-field {
	width: 100%;
}
</style>
<div id="container">
	<fxos-phone-field id="phoneField"></fxos-phone-field>
	<gaia-button data-digit="1">1 <span>∞</span></gaia-button>
	<gaia-button data-digit="2">2 <span>ABC</span></gaia-button>
	<gaia-button data-digit="3">3 <span>DEF</span></gaia-button>
	<gaia-button data-digit="4">4 <span>GHI</span></gaia-button>
	<gaia-button data-digit="5">5 <span>JKL</span></gaia-button>
	<gaia-button data-digit="6">6 <span>MNO</span></gaia-button>
	<gaia-button data-digit="7">7 <span>PQRS</span></gaia-button>
	<gaia-button data-digit="8">8 <span>TUV</span></gaia-button>
	<gaia-button data-digit="9">9 <span>WXYZ</span></gaia-button>
	<gaia-button data-digit="#">#</gaia-button>
	<gaia-button data-digit="0">0 <span>+</span></gaia-button>
	<gaia-button data-digit="*">*</gaia-button>
	<fxos-call-button data-phone-field="phoneField"></fxos-call-button>
</div>`;

proto.createdCallback = function() {
	var shadow = this.createShadowRoot();
	shadow.innerHTML = template;

	shadow.addEventListener('click', this.handleClick.bind(this));

	this._phoneField = shadow.getElementById('phoneField');
};

proto.handleClick = function(e) {
	var digit = e.target.dataset.digit;
	if (!digit) {
		return;
	}

	this._phoneField.addDigit(digit);
	navigator.vibrate(50);
};

var FXOSKeypad = document.registerElement('fxos-keypad', {
	prototype: proto
});

window.FXOSKeypad = FXOSKeypad;

})(window);
