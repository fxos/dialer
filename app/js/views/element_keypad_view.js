import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-button/gaia-button';

(function(window) {
'use strict';

var shadowTemplate =
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

var proto;

export default class ElementKeypadView extends View {
	constructor(controller) {
		proto = Object.create(HTMLElement.prototype);
		proto.createdCallback = this._createdCallback;
		proto._controller = controller;

		document.registerElement('fxos-keypad', { prototype: proto });
	}

	_createdCallback() {
		this.shadow = this.createShadowRoot();
		this.shadow.innerHTML = shadowTemplate;

		// XXX/drs: This is pretty bad, and we shouldn't be referring directly
		// to `proto` like this. Need to figure out sane scoping here.
		this.shadow.addEventListener(
			'click', proto._controller.handleClick.bind(proto._controller));
	}

	template() {
		return '<fxos-keypad></fxos-keypad>';
	}
}

})(window);
