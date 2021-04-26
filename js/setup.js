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

  let wizards = generateWizards(names, lastNames, coatColor, colorEyes);
  generateSimilarWizardsList();

  function generateWizards(names, lastNames, coats, eyes) {
    let result = [];
    for (let i = 0; i < 4; i++) {
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

  function renderWizard(wizard) {
    let wizardElement = template.cloneNode(true);
    wizardElement.querySelector(".setup-similar-label").textContent =
      wizard.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizard.coatColor;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizard.eyesColor;

    return wizardElement;
  }

  function generateSimilarWizardsList() {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarList.appendChild(fragment);
  }

  //здесь логика настройки мага юзера

  let setupWizardCoat = setup.querySelector(".wizard-coat");
  let setupWizardEyes = setup.querySelector(".wizard-eyes");
  let setupWizardFireball = setup.querySelector(".setup-fireball-wrap");

  setupWizardCoat.addEventListener("click", () => {
    setupWizardCoat.style.fill = coatColor[window.utils.getRandomElement(coatColor.length)];
  });

  setupWizardEyes.addEventListener("click", () => {
    setupWizardEyes.style.fill = colorEyes[window.utils.getRandomElement(colorEyes.length)];
  });

  setupWizardFireball.addEventListener("click", () => {
    setupWizardFireball.style.background =
      colorFireball[window.utils.getRandomElement(colorFireball.length)];
  });

  setupUserName.addEventListener("invalid", validityUserName);
 

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
