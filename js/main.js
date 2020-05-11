import { initMap, gameIsOver, handleClick, makeGameWinScreen, makeGameOverScreen, hasPlayerWin, updateTiles } from './game.js'

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

canvas.onmousedown = (event) => {
    if (event.button == 0) {
        handleClick(canvas,event);
    }
}

function update() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    updateTiles();

    if (gameIsOver()) {
        makeGameOverScreen(context);
    }

    if(hasPlayerWin()){
        makeGameWinScreen(context);
    }

    if (!gameIsOver()) {
        requestAnimationFrame(update);
    }

}

initMap(context);
update();