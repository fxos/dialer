import ElementPhoneFieldView from 'js/views/element_phone_field_view';
import { Controller } from 'components/fxos-mvc/dist/mvc';

export default class ElementPhoneFieldController extends Controller {
	constructor() {
		this.view = new ElementPhoneFieldView(this);
	}

	handleClick(e) {
		// Delete button was tapped.
		this.view.phoneField = this.view.phoneField.slice(0, -1);
	}

	handleContextMenu(e) {
		this.view.phoneField = '';
	}

	addDigit(digit) {
		this.view.phoneField += digit;
	}

	get phoneField() {
		return this.view.phoneField;
	}
}
