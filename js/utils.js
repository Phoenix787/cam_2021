'use strict';

(function () {
	const ESC_KEYCODE = 'Escape';
	const ENTER_KEYCODE = 'Enter';

	window.utils = {
		isEscEvent: (evt, action) => {
			if (evt.key === ESC_KEYCODE) {
				action();
			}
		},
		isEnterEvent: (evt, action) => {
			if (evt.key === ENTER_KEYCODE) {
				action();
			}
		},
		getRandomElement: (arrayLength) => {
			return Math.floor((arrayLength - 1) * Math.random());
		}
	};

})();