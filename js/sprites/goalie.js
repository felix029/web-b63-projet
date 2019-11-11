class Goalie{
    constructor(){
        this.x = -15;
        this.y = 122;

        let columnCount = 4;
        let rowCount = 5;
        let refreshDelay = 100;
        let loopInColumns = true;
        let scale = 1;

        this.sequence = 1;
        this.wait = 40;

        this.tiledImage = new TiledImage("images/goalie.png", columnCount, rowCount, refreshDelay, loopInColumns, scale);

        this.tiledImage.changeRow(0);
    }

    tick(){

        if(document.getElementById("error-div") == null){
            if(this.sequence == 1){
                if(this.x < 160){
                    this.x += 0.5;
                    this.tiledImage.setLooped(true);
                }
                else{
                    this.tiledImage.setLooped(false);
                    this.sequence = 2;
                }
            }
    
            if(this.sequence == 2){
    
                if(this.wait == 0){
                    this.sequence = 3;
                    this.wait = 20;
                }
                else if(this.wait <=20){
                    this.tiledImage.setFlipped(0);
                    this.tiledImage.changeRow(3);
                    this.tiledImage.changeCol(0);
                    this.y = 144;
                }
                else{
                    this.tiledImage.setFlipped(90);
                    this.tiledImage.changeRow(2);
                    this.tiledImage.changeCol(1);
                }
                
                this.wait--;
            }
    
            if(this.sequence == 3){
                this.tiledImage.changeRow(3);
                this.tiledImage.changeCol(3);
                this.tiledImage.setFlipped(0);
                if(this.y >= 83){
                    this.y -= 3;
                }
                else{
                    this.sequence = 4;
                }
            }
    
            if(this.sequence == 4){
                if(this.wait == 0){
                    this.tiledImage.changeCol(2);
                    this.y = 73;
                    this.wait = 20;
                    this.sequence = 5;
                }
                else{
                    this.wait--;
                }
            }
    
            if(this.sequence == 5){
                if(this.wait == 0){
                    this.tiledImage.changeCol(1);
                    this.y = 46;
                    this.wait = 20;
                    this.sequence = 6;
                }
                else{
                    this.wait--;
                }
            }
    
            if(this.sequence == 6){
                if(this.wait == 0){
                    this.tiledImage.changeCol(0);
                    this.y = 34;
                    this.wait = 20;
                    this.sequence = 7;
                }
                else{
                    this.wait--;
                }
            }
    
            if(this.sequence == 7){
                if(this.wait == 0){
                    this.tiledImage.changeCol(1);
                    this.tiledImage.changeRow(2);
                    this.tiledImage.setFlipped(90);
                    this.y = 19;
                    this.wait = 40;
                    this.sequence = 8;
                }
                else{
                    this.wait--;
                }
            }
            if(this.sequence == 8){
                if(this.wait == 0){
                    this.tiledImage.changeCol(0);
                    this.tiledImage.changeRow(4);
                    this.tiledImage.setFlipped(0);
                    this.y = 27;
    
                    $('#infos').fadeIn(3500);
                    $('#infos').css("z-index", 999);
                    $('canvas').css("z-index", 0);
                }
                else{
                    this.wait--;
                }
            }
        }
        else{
            this.y = 27;
            this.x = 160;
            this.tiledImage.changeCol(0);
            this.tiledImage.changeRow(4);
            this.tiledImage.setFlipped(0);
            $('#infos').show();
            $('#infos').css("z-index", 999);
            $('canvas').css("z-index", 0);
        }

        this.tiledImage.tick(this.x, this.y, ctx);

        return true;
    }
}