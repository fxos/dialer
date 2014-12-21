import { Controller } from 'components/fxos-mvc/dist/mvc';
import ElementKeypadController from 'js/controllers/element_keypad_controller';

export default class MainController extends Controller {
	constructor() {
	}

	main() {
		this._keypadController = new ElementKeypadController();
		document.body.innerHTML = this._keypadController.view.template();
	}
}
