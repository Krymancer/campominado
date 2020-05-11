export default class Tile {
    constructor(context, x, y) {
        this.context = context;
        this.x = x;
        this.y = y;

        this.clicked = false;
        this.colors = ['blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
        this.font = "bold 30px Arial";
        this.backgroundColor = "#9c9c9c";

        this.number = '0';

        this.tileWidth = 60;
        this.tileHeight = 60;

        this.tile = new OffscreenCanvas(this.tileWidth, this.tileHeight);

        this.initTile();
    }

    initTile() { // Draw Tile UI
        const tileContext = this.tile.getContext('2d');

        const rectWidth = 2;

        // Tile background
        tileContext.fillStyle = this.backgroundColor;
        tileContext.fillRect(0, 0, this.tileWidth, this.tileHeight);

        // Upper white indent
        tileContext.fillStyle = 'white';
        tileContext.fillRect(0, 0, rectWidth, 60);
        tileContext.fillRect(0, 0, 60, rectWidth);

        // Bottom gray indent
        tileContext.fillStyle = 'grey';
        tileContext.fillRect(this.tileWidth - rectWidth, 0, rectWidth, 60);
        tileContext.fillRect(0, this.tileHeight - rectWidth, this.tileWidth, rectWidth);

        tileContext.fillStyle = 'white';

        // Lower left triangle
        tileContext.moveTo(0, this.tileHeight - rectWidth);
        tileContext.lineTo(0, this.tileHeight);
        tileContext.lineTo(rectWidth, this.tileHeight - rectWidth);

        // Upper rifht triangule
        tileContext.moveTo(this.tileWidth - rectWidth, 0);
        tileContext.lineTo(this.tileWidth - rectWidth, rectWidth);
        tileContext.lineTo(this.tileWidth, 0);

        tileContext.fill();
    }

    setTileNumber(number) {
        const tileContext = this.tile.getContext('2d');

        let xLocation, yLocation;

        tileContext.fillStyle = this.backgroundColor;
        tileContext.fillRect(0, 0, this.tileWidth - 1, this.tileHeight - 1);

        tileContext.fillStyle = this.colors[number - 1];
        tileContext.font = this.font;

        if (number !== '💣') {
            xLocation = this.tile.width / 2 - 9; // Hard coded offsets to center the font
            yLocation = this.tile.height / 2 + 10; // Hard coded offsets to center the font
        } else {
            xLocation = this.tile.width / 2 - 20; // Hard coded offsets to center the font
            yLocation = this.tile.height / 2 + 10; // Hard coded offsets to center the font
        }

        if (number != 0) {
            tileContext.fillText(number, xLocation, yLocation);
        }

    }

    show() {
        this.context.fillStyle = this.backgroundColor;
        this.context.drawImage(this.tile, this.x, this.y);
    }

    click() {
        if (this.clicked) {
            return;
        }

        this.clicked = true;
        this.setTileNumber(this.number);
        return this.number;
    }
}