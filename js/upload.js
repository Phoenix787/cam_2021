(function () {

	let serverStatus = {
		SUCCESS: 200,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		NOT_FOUND: 404,
		EXTERNAL: 500
	}

	let onError = (message) => {
		console.error(message);
	}

	let URL = 'https://javascript.pages.academy/code-and-magick';

	window.upload = (data, onSuccess) => {
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.addEventListener('load', (evt) => {
			switch (xhr.status) {
				case serverStatus.SUCCESS:
					onSuccess(xhr.response);
					break;
				case serverStatus.BAD_REQUEST:
					onError('Неправильный запрос');
					break;
				case serverStatus.UNAUTHORIZED:
					onError('Пользователь не авторизован');
					break;
				case serverStatus.NOT_FOUND:
					onError('Ничего не найдено');
					break;			
			
				default:
					onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
					break;
			}			
		});
		xhr.addEventListener('error', (evt) => {
			onError('Произошла ошибка соединения');
		});

		xhr.open('POST', URL);
		xhr.send(data);	
	};
	
})();