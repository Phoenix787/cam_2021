(function () {
	const WIZARD_COUNT = 4;
	let template = document
    .querySelector("#similar-wizard-template")
    .content.querySelector(".setup-similar-item");
	let similarList = document.querySelector(".setup-similar-list");

	function renderWizard(wizard) {
    let wizardElement = template.cloneNode(true);
    wizardElement.querySelector(".setup-similar-label").textContent =
      wizard.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizard.colorCoat;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizard.colorEyes;

    return wizardElement;
  }

	window.render = function (data) {
		let fragment = document.createDocumentFragment();
		similarList.innerHTML = '';

		for (let i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarList.appendChild(fragment);
	};


})();