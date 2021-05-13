(function () {
	const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

	let upload = document.querySelector('.upload');
	let fileChooser = upload.querySelector('input[type=file]');
	let preview = upload.querySelector('.setup-user-pic');

	preview.addEventListener('click', (e)=> {
		if(fileChooser) {
			fileChooser.click();
		}
		e.preventDefault();
	}, false)

	fileChooser.addEventListener('change', () => {
		handleFiles(fileChooser.files);	
	});

	upload.addEventListener('dragenter', (evt) => {
		evt.stopPropagation();
		evt.preventDefault();
	});

	upload.addEventListener('dragover', (evt) => {
		evt.stopPropagation();
		evt.preventDefault();
	});

	upload.addEventListener('drop', (evt) => {
		evt.stopPropagation();
		evt.preventDefault();

		let dt = evt.dataTransfer;
		let files = dt.files;
		handleFiles(files);
	});

	function handleFiles(files) {
		let file = files[0];
		let fileName = file.name.toLowerCase();

		let matches = FILE_TYPES.some((it) => fileName.endsWith(it));

		if (matches) {
			let reader = new FileReader();

			reader.addEventListener('load', () => preview.src = reader.result);
			reader.readAsDataURL(file);
		}
	}

})();