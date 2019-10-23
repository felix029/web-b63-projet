class Goalie{
    constructor(){
        this.x = -15;
        this.y = 100;

        let columnCount = 4;
        let rowCount = 6;
        let refreshDelay = 70;
        let loopInColumns = false;
        let scale = 0.3;

        this.tiledImage = new TiledImage("images/goalie.png", columnCount, rowCount, refreshDelay, loopInColumns, scale);

        this.tiledImage.changeRow(0);
    }

    tick(){

        this.x += 1;

        this.tiledImage.setLooped(true);

        this.tiledImage.tick(this.x, this.y, ctx);

        return true;
    }
}