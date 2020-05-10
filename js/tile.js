export default class Tile {
    constructor(context, x, y) {
        this.context = context;
        this.x = x;
        this.y = y;

        this.clicked = false;

        this.number = '0';

        this.tileWidth = 60;
        this.tileHeight = 60;
        this.tile = new OffscreenCanvas(this.tileWidth, this.tileHeight);
        this.initTile();

    }

    initTile() {
        const tileContext = this.tile.getContext('2d');

        const rectWidth = 2;

        tileContext.fillStyle = '#9c9c9c';
        tileContext.fillRect(0,0,this.tileWidth,this.tileHeight);

        //retangulos brancos
        tileContext.fillStyle = 'white';
        tileContext.fillRect(0, 0, rectWidth, 60);
        tileContext.fillRect(0, 0, 60, rectWidth);

        //retangulos cinza
        tileContext.fillStyle = 'grey';
        tileContext.fillRect(this.tileWidth - rectWidth, 0, rectWidth, 60);
        tileContext.fillRect(0, this.tileHeight - rectWidth, this.tileWidth, rectWidth);

        tileContext.fillStyle = 'white';

        //triangulo inferior esquerdo
        tileContext.moveTo(0, this.tileHeight - rectWidth);
        tileContext.lineTo(0, this.tileHeight);
        tileContext.lineTo(rectWidth, this.tileHeight - rectWidth);

        //triangulo superior direito
        tileContext.moveTo(this.tileWidth - rectWidth, 0);
        tileContext.lineTo(this.tileWidth - rectWidth, rectWidth);
        tileContext.lineTo(this.tileWidth, 0);

        tileContext.fill();
    }

    setTileNumber(number) {
        const tileContext = this.tile.getContext('2d');
        const colors = ['blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
        let xLocation, yLocation;

        tileContext.fillStyle = '#9c9c9c';
        tileContext.fillRect(0, 0, this.tileWidth - 1, this.tileHeight - 1);

        tileContext.fillStyle = colors[number - 1];
        tileContext.font = "bold 30px Arial";
        if (number !== '💣') {
            xLocation = this.tile.width / 2 - 9;
            yLocation = this.tile.height / 2 + 10;
        } else {
            xLocation = this.tile.width / 2 - 20;
            yLocation = this.tile.height / 2 + 10;
        }

        

        if (number != 0) {
            tileContext.fillText(number, xLocation, yLocation);
        }

    }

    setNumber(number) {
        this.number = number;
    }

    show() {
        this.context.fillStyle = '#9c9c9c';
        this.context.drawImage(this.tile, this.x, this.y);
    }

    click() {
        if(this.clicked){
            return;
        }
        this.clicked = true;
        this.setTileNumber(this.number);
        return this.number;
    }
}