"use strict";
(function () {
  //логика связанная с открытием и закрытием окна setup
  let setup = document.querySelector(".setup");
  let setupOpen = document.querySelector(".setup-open");
  let dialogHandle = document.querySelector(".setup-user-pic");
  let setupClose = setup.querySelector(".setup-close");
  let setupUserName = setup.querySelector(".setup-user-name");
	let startCds = {};
  setupOpen.addEventListener("click", openSetupDialog);
  // открытие окна настроек пользователя через фокус и клавишу Enter
  setupOpen.addEventListener("keydown", openSetupDialogOnEnter);

  //закрытие окна настроек чепез фокус на крестик и клавишу энтер
  setupClose.addEventListener("keydown", closeSetupDialogOnEnter);

  setupClose.addEventListener("click", closeSetupDialog);

  function openSetupDialog() {
    document.querySelector(".setup-similar").classList.remove("hidden");
    setup.classList.remove("hidden");
    document.addEventListener("keydown", closeSetupDialogOnEsc);
    document.removeEventListener("keydown", openSetupDialogOnEnter);
		startCds = {
      x: setup.style.top,
      y: setup.style.top,
    };
  }

  function closeSetupDialog() {
    if (document.activeElement !== setupUserName) {
			setup.style.top = startCds.y;
      setup.style.left = startCds.x;
      setup.classList.add("hidden");
      document.removeEventListener("keydown", closeSetupDialogOnEsc);
			
    }
  }

  function closeSetupDialogOnEsc(evt) {
    // if (evt.key === ESC_KEY_CODE) {
    //   closeSetupDialog();
    // }
		window.utils.isEscEvent(evt, closeSetupDialog);
  }

  function closeSetupDialogOnEnter(evt) {
    // if (evt.key === ENTER_KEY_CODE) {
    //   closeSetupDialog();
    // }
		window.utils.isEnterEvent(evt, closeSetupDialog);
  }

  function openSetupDialogOnEnter(evt) {
    // if (evt.key === ENTER_KEY_CODE) {
    //   openSetupDialog();
    // }
		window.utils.isEnterEvent(evt, openSetupDialog);
  }
  //здесь логика перетаскивания окна за аватарку

  dialogHandle.addEventListener("mousedown", (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    let dragged = false;

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      setup.style.top = setup.offsetTop - shift.y + "px";
      setup.style.left = setup.offsetLeft - shift.x + "px";
    };

    let onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      if (dragged) {
        let onClickPreventDefault = (evt) => {
          evt.preventDefault();
          dialogHandle.removeEventListener("click", onClickPreventDefault);
        };
        dialogHandle.addEventListener("click", onClickPreventDefault);
      }

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  //FIXME: так пишутся тудушки и фиксми
  //---------------------------------------------------------------------------------------------------------------------
})();
