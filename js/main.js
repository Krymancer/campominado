import Tile from './tile.js'

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const map = [];

let gameOver = false;

const bombstQtd = 10;

for (let i = 0; i < 10; i++) {
    map[i] = [];
    for (let j = 0; j < 10; j++) {
        map[i][j] = new Tile(context, i * 60, j * 60);
    }
}

for (let i = 0; i < bombstQtd; i++) {
    let bombx, bomby;
    do {
        bombx = random(0, 10);
        bomby = random(0, 10);
    } while (map[bombx][bomby].number === '💣');
    map[bombx][bomby].setNumber('💣');
}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if (map[i][j].number === '💣') {
            continue;
        }

        let bombs = 0;

        //superior esquerdo
        if (map[i - 1]) {
            if (map[i - 1][j - 1]) {
                if (map[i - 1][j - 1].number === '💣') {
                    bombs += 1;
                }
            }
        }

        //superior centro
        if (map[i]) {
            if (map[i][j - 1]) {
                if (map[i][j - 1].number === '💣') {
                    bombs += 1;
                }
            }
        }

        //superior direito
        if (map[i + 1]) {
            if (map[i + 1][j - 1]) {
                if (map[i + 1][j - 1].number === '💣') {
                    bombs += 1;
                }
            }
        }

        //meio esquerdo
        if (map[i - 1]) {
            if (map[i - 1][j]) {
                if (map[i - 1][j].number === '💣') {
                    bombs += 1;
                }
            }
        }

        //meio direito 
        if (map[i + 1]) {
            if (map[i + 1][j]) {
                if (map[i + 1][j].number === '💣') {
                    bombs += 1;
                }
            }
        }

        //inferior esquerdo
        if (map[i - 1]) {
            if (map[i - 1][j + 1]) {
                if (map[i - 1][j + 1].number === '💣') {
                    bombs += 1;
                }
            }
        }

        //inferior centro
        if (map[i]) {
            if (map[i][j + 1]) {
                if (map[i][j + 1].number === '💣') {
                    bombs += 1;
                }
            }
        }

        //inferior direito
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

function random(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Auxiliar function, returns the the col,row of a cell based on mouse position
function getMousePos(canvas, evt) {

    let rect = canvas.getBoundingClientRect(),
        scaleX = 600 / 60,    // relationship bitmap vs. element for X
        scaleY = 600 / 60;  // relationship bitmap vs. element for Y

    return {
        column: Math.floor((evt.clientX - rect.left) / 60),
        row: Math.floor((evt.clientY - rect.top) / 60)
    };
}

canvas.onmousedown = (event) => {
    if (event.button == 0) {
        const location = getMousePos(canvas, event);''
        let number = map[location.column][location.row].click();
        if (number == 0) {
            clearTile(location.column, location.row, true);
        } else {
            if (number === '💣') gameOver = true;
        }
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

function update() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    map.forEach(column => {
        column.forEach(tile => {
            tile.show();
        });
    });

    if (gameOver) {
        context.fillStyle = 'Black';
        context.font = "bold 60px Arial";
        let xLocation = 150;
        let yLocation = 300;
        context.fillText('Game Over', xLocation, yLocation);
    }

    let clicked = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (map[i][j].clicked) {
                clicked++;
            }
        }
    }

    if (clicked == (100 - bombstQtd)) {
        console.log('win');
        gameOver = true;
        context.fillStyle = 'Black';
        context.font = "bold 60px Arial";
        let xLocation = 180;
        let yLocation = 300;
        context.fillText('You Win', xLocation, yLocation);
    }

    if (!gameOver) {
        requestAnimationFrame(update);
    }

}

update();