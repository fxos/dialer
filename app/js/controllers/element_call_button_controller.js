import ElementCallButtonView from 'js/views/element_call_button_view';
import { Controller } from 'components/fxos-mvc/dist/mvc';

export default class ElementCallButtonController extends Controller {
	constructor(phoneFieldController) {
		this.view = new ElementCallButtonView(this, phoneFieldController);
	}

	handleClick(e) {
		navigator.mozTelephony.dial(this.view.phoneNumber());
	}
}
