"use strict";
(function () {
  let CLOUD_WIDTH = 420;
  let CLOUD_HEIGHT = 270;
  let CLOUD_X = 90;
  let CLOUD_Y = 20;
  let GAP = 10;
  let FONT_GAP = 16;
  let GIST_HEIGHT = 150;
  let COLUMN_WIDTH = 40;
  let DIST_COLUMN = 50;

  let renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  window.renderStatistics = function (ctx, names, times) {
    let max = Math.round(Math.max.apply(null, times));
    let c = GIST_HEIGHT / max;

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
    renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");

    ctx.font = "16px PT Mono";
    ctx.fillStyle = "#000";
    ctx.fillText("Ура вы победили!", 110, 45);
    ctx.fillText("Список результатов:", 110, 60);

    gistFunction(ctx, names, times, c);

    function gistFunction(ctx, names, times, c) {
      names.sort();
      for (let nm of names) {
        let i = names.indexOf(nm);
        let player = Math.round(times[i] * c);
        let initialX = CLOUD_X + GAP + (COLUMN_WIDTH + DIST_COLUMN) * i + 1;
        let initialY = CLOUD_HEIGHT - GAP;
        ctx.fillText(nm, initialX, initialY);
        fillBarColor(nm);
        ctx.fillRect(
          initialX,
          initialY - FONT_GAP - player,
          COLUMN_WIDTH,
          player
        );
        ctx.fillStyle = "#000";
        ctx.fillText(
          Math.round(times[i]),
          initialX,
          initialY - FONT_GAP - player - 10
        );
      }
    }

    function fillBarColor(namePlayer) {
      let randomOpacity = Math.random().toFixed(2);

      if (namePlayer === "Вы") {
        ctx.fillStyle = "rgba(255, 0, 0, 1)";
      } else {
        ctx.fillStyle = "rgba(0, 0, 255, " + randomOpacity + ")";
      }
    }
  };
})();
