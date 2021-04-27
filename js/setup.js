"use strict";

(function () {
  let setup = document.querySelector(".setup");
	let setupUserName = setup.querySelector(".setup-user-name");

  //логика связанная с генерацией похожих магов и настройкой

  let similarList = document.querySelector(".setup-similar-list");
  let template = document
    .querySelector("#similar-wizard-template")
    .content.querySelector(".setup-similar-item");

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

	const WIZARD_COUNT = 4;

	let userWizardElement = document.querySelector('.wizard');
	let setupWizardCoat = setup.querySelector(".wizard-coat");
  let setupWizardEyes = setup.querySelector(".wizard-eyes");
  let setupWizardFireball = setup.querySelector(".setup-fireball-wrap");
	let hiddenWizardFireball = setup.querySelector('input[name="fireball-color"]');
	let hiddenWizardEyesColor = setup.querySelector('input[name="eyes-color"]');
	let hiddenWizardCoatColor = setup.querySelector('input[name="coat-color"]');



  // let wizards = generateWizards(names, lastNames, coatColor, colorEyes);
  //let wizards = getWizardsFromServer() || generateWizards(names, lastNames, coatColor, colorEyes);
//  generateSimilarWizardsList();

let wizards = [];
getWizardsFromServer();




  function generateWizards(names, lastNames, coats, eyes) {
    let result = [];
    for (let i = 0; i < WIZARD_COUNT; i++) {
      let obj = {};
      obj.name =
        names[window.utils.getRandomElement(names.length)] +
        " " +
        lastNames[window.utils.getRandomElement(lastNames.length)];
      obj.coatColor = coats[window.utils.getRandomElement(coats.length)];
      obj.eyesColor = eyes[window.utils.getRandomElement(eyes.length)];
      result.push(obj);
    }

    return result;
  }

	function getWizardsFromServer() {
		let xhr = new XMLHttpRequest();
		let list = null;

		xhr.open('GET', 'https://javascript.pages.academy/code-and-magick/data');

		xhr.addEventListener('load', () => {
			
			list = JSON.parse(xhr.responseText);
			generateSimilarWizardsList(list);
			wizards = list;
		});

		xhr.send();

	}

  function renderWizard(wizard) {
    let wizardElement = template.cloneNode(true);
    wizardElement.querySelector(".setup-similar-label").textContent =
      wizard.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizard.colorCoat;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizard.colorEyes;

    return wizardElement;
  }

	
  function generateSimilarWizardsList(list) {
		let items = similarList.querySelectorAll('.setup-similar-item');
		if (items.length > 0) {
			removeChilds(similarList);
		}
		
		let fragment = document.createDocumentFragment();
		
    for (let i = 0; i < WIZARD_COUNT; i++) {
			fragment.appendChild(renderWizard(list[i]));
    }
		
    similarList.appendChild(fragment);
  }

	function removeChilds(element) {
		while(element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}


	function compareParameter(userWizardParameter, otherWizardParameter) {
		return userWizardParameter === otherWizardParameter
	}

	function updateSimiliarWizards(parameter) {
		let userWizard = getUserWizard();
		let similiars = [];

		for(let i = 0; i < wizards.length; i++) {
			if(compareParameter(userWizard[parameter], wizards[i][parameter])) {
				similiars.push(wizards[i]);
			} 
		}
		if (similiars.length < WIZARD_COUNT) {
			similiars = similiars.concat(wizards);
		}
		generateSimilarWizardsList(similiars);
	}
  //здесь логика настройки мага юзера  
	
  setupWizardCoat.addEventListener("click", () => {
		setupWizardCoat.style.fill = coatColor[window.utils.getRandomElement(coatColor.length)];
		hiddenWizardCoatColor.value = setupWizardCoat.style.fill;
		updateSimiliarWizards("colorCoat");
  });
	
  setupWizardEyes.addEventListener("click", () => {
		setupWizardEyes.style.fill = colorEyes[window.utils.getRandomElement(colorEyes.length)];
		hiddenWizardEyesColor.value = setupWizardEyes.style.fill;
		updateSimiliarWizards("colorEyes");

  });
	
  setupWizardFireball.addEventListener("click", () => {
		setupWizardFireball.style.background =
		colorFireball[window.utils.getRandomElement(colorFireball.length)];
		hiddenWizardFireball.value = setupWizardFireball.style.background;
		updateSimiliarWizards("colorFireball");
  });
	
  setupUserName.addEventListener("invalid", validityUserName);
	
	
	function getUserWizard() {
		
		return {
			name: setupUserName.value,
		  colorCoat: hiddenWizardCoatColor.value,
		  colorEyes: hiddenWizardEyesColor.value,
		  colorFireball: hiddenWizardFireball.value
		}
	}


	//валидация поля формы
  function validityUserName(evt) {
    let message;
    if (setupUserName.validity.tooShort) {
      message =
        "Имя слишком короткое. Оно должно состоять минимум из 2-х символов.";
    } else if (setupUserName.validity.tooLong) {
      message = "Имя слишком длинное. Оно не должно превышать 25 символов.";
    } else if (setupUserName.validity.valueMissing) {
      message = "Введите имя персонажа";
    } else {
      message = "";
    }
    setupUserName.setCustomValidity(message);
  }
})();
