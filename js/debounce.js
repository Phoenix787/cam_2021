(function () {
	const DEBOUNCE_INTERVAL = 300;

	window.debounce = function (fun) {
		let lastTimeout = null;

		return function () {
			let args = arguments;
			if (lastTimeout) {
				window.clearTimeout(lastTimeout);
			}
			lastTimeout = window.setTimeout(function() {
		fun.apply(null, args);
 }, DEBOUNCE_INTERVAL);
		};
} 
})();