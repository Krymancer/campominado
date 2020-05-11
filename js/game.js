import Tile from './tile.js'
import { random, getMousePosition } from './util.js'

const BOMBSAMMOUT = 10;
const COLUMNS = 10;
const ROWS = 10;
const TILEOFFSET = 60;
const TOTALTILES = COLUMNS * ROWS;

const map = [];

let gameOver = false;

export function initMap(context) {
    for (let i = 0; i < COLUMNS; i++) { // Iterate to every column
        map[i] = []; // Create a new array for rows
        for (let j = 0; j < ROWS; j++) { // Iterate to every row
            map[i][j] = new Tile(context, i * TILEOFFSET, j * TILEOFFSET); // Create a Tile object
        }
    }

    for (let i = 0; i < BOMBSAMMOUT; i++) {
        let bombX, bomby;
        do {
            bombX = random(0, 10);
            bomby = random(0, 10);
        } while (map[bombX][bomby].number === '💣');
        map[bombX][bomby].number = '💣';
    }

    caculateTileNumber(map);

    return map;
}

function caculateTileNumber(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (map[i][j].number === '💣') {
                continue;
            }
    
            let bombs = 0;
    
            // Left upper
            if (map[i - 1]) {
                if (map[i - 1][j - 1]) {
                    if (map[i - 1][j - 1].number === '💣') {
                        bombs += 1;
                    }
                }
            }
    
            // Upper Middle
            if (map[i]) {
                if (map[i][j - 1]) {
                    if (map[i][j - 1].number === '💣') {
                        bombs += 1;
                    }
                }
            }
    
            // Right uppper
            if (map[i + 1]) {
                if (map[i + 1][j - 1]) {
                    if (map[i + 1][j - 1].number === '💣') {
                        bombs += 1;
                    }
                }
            }
    
            // Left Middle
            if (map[i - 1]) {
                if (map[i - 1][j]) {
                    if (map[i - 1][j].number === '💣') {
                        bombs += 1;
                    }
                }
            }
    
            // Right Middle
            if (map[i + 1]) {
                if (map[i + 1][j]) {
                    if (map[i + 1][j].number === '💣') {
                        bombs += 1;
                    }
                }
            }
    
            // Lower Left
            if (map[i - 1]) {
                if (map[i - 1][j + 1]) {
                    if (map[i - 1][j + 1].number === '💣') {
                        bombs += 1;
                    }
                }
            }
    
            // Lower middle
            if (map[i]) {
                if (map[i][j + 1]) {
                    if (map[i][j + 1].number === '💣') {
                        bombs += 1;
                    }
                }
            }
    
            // Lower right
            if (map[i + 1]) {
                if (map[i + 1][j + 1]) {
                    if (map[i + 1][j + 1].number === '💣') {
                        bombs += 1;
                    }
                }
            }
    
            map[i][j].number = bombs;
        }
    }
}

export function handleClick(canvas,event){
    const location = getMousePosition(canvas, event);

        let number = map[location.column][location.row].click();
        
        if (number == 0) {
            clearTile(location.column, location.row, true);
        } else {
            gameOver = (number === '💣');
        }
}

function clearTile(i, j, frist = false) {
    if (!frist) {
        if (map[i][j].number != 0 || map[i][j].clicked) {
            return;
        }
    }

    //superior esquerdo
    if (map[i - 1]) {
        if (map[i - 1][j - 1]) {
            if (map[i - 1][j - 1].number == 0) {
                map[i - 1][j - 1].click();
                clearTile(i - 1, j - 1);
            }
        }
    }

    //superior centro
    if (map[i]) {
        if (map[i][j - 1]) {
            if (map[i][j - 1].number == 0) {
                map[i][j - 1].click();
                clearTile(i, j - 1);

            }
        }
    }

    //superior direito
    if (map[i + 1]) {
        if (map[i + 1][j - 1]) {
            if (map[i + 1][j - 1].number == 0) {
                map[i + 1][j - 1].click();
                clearTile(i + 1, j - 1);

            }
        }
    }

    //meio esquerdo
    if (map[i - 1]) {
        if (map[i - 1][j]) {
            if (map[i - 1][j].number == 0) {
                map[i - 1][j].click();
                clearTile(i - 1, j);

            }
        }
    }

    //meio direito 
    if (map[i + 1]) {
        if (map[i + 1][j]) {
            if (map[i + 1][j].number == 0) {
                map[i + 1][j].click();
                clearTile(i + 1, j);
            }
        }
    }

    //inferior esquerdo
    if (map[i - 1]) {
        if (map[i - 1][j + 1]) {
            if (map[i - 1][j + 1].number == 0) {
                map[i - 1][j + 1].click();
                clearTile(i - 1, j + 1);

            }
        }
    }

    //inferior centro
    if (map[i]) {
        if (map[i][j + 1]) {
            if (map[i][j + 1].number == 0) {
                map[i][j + 1].click();
                clearTile(i, j + 1);

            }
        }
    }

    //inferior direito
    if (map[i + 1]) {
        if (map[i + 1][j + 1]) {
            if (map[i + 1][j + 1].number == 0) {
                map[i + 1][j + 1].click();
                clearTile(i + 1, j + 1);

            }
        }
    }
}

export function updateTiles(){
    map.forEach(column => {
        column.forEach(tile => {
            tile.show();
        });
    });
}

export function gameIsOver(){
    return gameOver;
}

export function hasPlayerWin(){
    let clicked = 0;
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (map[i][j].clicked) {
                clicked++;
            }
        }
    }

    if (clicked == (TOTALTILES - BOMBSAMMOUT)) {
        gameOver = true;
        return true;
    }

    return false;
}

export function makeGameWinScreen(context){
    context.fillStyle = 'Black';
    context.font = "bold 60px Arial";
    let xLocation = 180;
    let yLocation = 300;
    context.fillText('You Win', xLocation, yLocation);
}

export function makeGameOverScreen(context){
    context.fillStyle = 'Black';
    context.font = "bold 60px Arial";
    let xLocation = 150;
    let yLocation = 300;
    context.fillText('Game Over', xLocation, yLocation);
}
