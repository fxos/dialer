import ElementKeypadView from 'js/views/element_keypad_view';
import { Controller } from 'components/fxos-mvc/dist/mvc';
import ElementCallButtonController from
	'js/controllers/element_call_button_controller';
import ElementPhoneFieldController from
	'js/controllers/element_phone_field_controller';

export default class ElementKeypadController extends Controller {
	constructor() {
		this._phoneFieldController = new ElementPhoneFieldController();
		this._callButtonController =
			new ElementCallButtonController(this._phoneFieldController);
		this.view = new ElementKeypadView(this);
	}

	handleClick(e) {
		var digit = e.target.dataset.digit;
		if (!digit) {
			return;
		}

		this._phoneFieldController.addDigit(digit);
		navigator.vibrate(50);
	}
}
