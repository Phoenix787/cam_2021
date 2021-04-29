
(function() {

	let serverCode = {
		SUCCESS: 200,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		NOT_FOUND: 404,
		SERVER_ERROR: 500
	}

	let url = {
		LOAD: 'https://javascript.pages.academy/code-and-magick/data',
		UPLOAD: 'https://javascript.pages.academy/code-and-magick'
	}

function createXmlHttpRequest(onSuccess, onError) {
	let xhr = new XMLHttpRequest();

	xhr.responseType = 'json';


	xhr.addEventListener('load', () => {
		switch (xhr.status) {
			case serverCode.SUCCESS:
				onSuccess(xhr.response);
				break;
			case serverCode.BAD_REQUEST:
				onError('Неправильный запрос');
				break;
			case serverCode.UNAUTHORIZED:
				onError('Пользователь не авторизован');
				break;
			case serverCode.NOT_FOUND:
				onError('Запрашиваемый ресурс не найден');
				break;
			case serverCode.SERVER_ERROR:
				onError('Ошибка сервера');
				break;
		
			default:
				onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
				break;
		}
	});
	xhr.addEventListener('error', () => onError('При загрузке произошла ошибка'), false);
	return xhr;
}

	function load(onSuccess, onError) {
		let xhr = createXmlHttpRequest(onSuccess, onError);
		xhr.open('GET', url.LOAD);
		xhr.send();
	}

	function save(data, onSuccess, onError) {
		let xhr = createXmlHttpRequest(onSuccess, onError);
		xhr.open('POST', url.UPLOAD);
		xhr.send(data);	
	}

	window.backend = {
		load: load,
		save: save
	}
})()