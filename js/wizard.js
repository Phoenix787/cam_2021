(function () {

	let wizard = {
		onEyesChange: function(color) {
			return color;
		},
		onCoatChange: function(color) {
			return color;
		},
		onFireballChange: function(color) {
			return color;
		}
	};

	let names = [
    "Иван",
    "Хуан Себастьян",
    "Мария",
    "Кристоф",
    "Виктор",
    "Юлия",
    "Люпита",
    "Вашингтон",
  ];
  let lastNames = [
    "да Марья",
    "Верон",
    "Мирабелла",
    "Вальц",
    "Онопко",
    "Топольницкая",
    "Нионго",
    "Ирвинг",
  ];
  let coatColor = [
    "rgb(101, 137, 164)",
    "rgb(241, 43, 107)",
    "rgb(146, 100, 161)",
    "rgb(56, 159, 117)",
    "rgb(215, 210, 55)",
    "rgb(0, 0, 0)",
  ];
  let colorEyes = ["black", "red", "blue", "yellow", "green"];

  let colorFireball = ["#ee4830", "#30a8ee", "#5ce6c0", "#e848d5", "#e6e848"];

	let wizardElement = document.querySelector('.setup-wizard');
	let wizardCoatElement = wizardElement.querySelector(".wizard-coat");
  let wizardEyesElement = wizardElement.querySelector(".wizard-eyes");
  let wizardFireballElement = document.querySelector(".setup-fireball-wrap");
	

	wizardCoatElement.addEventListener('click', () => {
		let newColor = coatColor[window.utils.getRandomElement(coatColor.length)];
		wizardCoatElement.style.fill = newColor;
		wizard.onCoatChange(newColor);
	});

	wizardEyesElement.addEventListener('click', () => {
		let newColor = colorEyes[window.utils.getRandomElement(colorEyes.length)];
		wizardEyesElement.style.fill = newColor;
		wizard.onEyesChange(newColor);
	});

	wizardFireballElement.addEventListener('click', () => {
		let newColor = colorFireball[window.utils.getRandomElement(colorFireball.length)];
		wizardFireballElement.style.background = newColor;
		wizard.onFireballChange(newColor);

	});

	window.wizard = wizard;

})();