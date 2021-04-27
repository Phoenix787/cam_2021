(function () {

	let url = 'https://javascript.pages.academy/code-and-magick/data';

	window.load = (onSuccess, onError) => {
		let xhr = new XMLHttpRequest();

		xhr.responseType = 'json';
		xhr.open('GET', url);

		xhr.addEventListener('load', () => {
			onSuccess(xhr.response);
		});
		xhr.send();
	}
})();

//TODO: написать switch по статусам и задействовать onError
